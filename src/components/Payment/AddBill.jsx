import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import CreatePopup from '../PageContents/CreatePopup.jsx'

class AddBill extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      billDetails: [],
      showPopup: false,
      flatName: this.props.flat,
      month: this.props.month,
      year: this.props.year,
      bill: {},
      service: [],
      errors: [],
      total: 0
    }
    this.handleClickAddService = this.handleClickAddService.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.getMonthOfBill = this.getMonthOfBill.bind(this);
    this.handleAddBilDetail = this.handleAddBilDetail.bind(this);
    this.reloadServices = this.reloadServices.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  async componentDidMount() {
    this.getServices(this);
    this.getUserFromSession(this);
    await this.getBill(this);
    await this.getBillDetails(this);
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err =>{
      console.log("err", err);
    })
  }

  async getServices(e) {
    await axios.get("/service/get-services", {
      params: {
        apartment: e.props.match.params.id
      }
    }).then(response => {
      let services = response.data.filter(item => item.description == '');
      e.setState({ service: services });
    }).catch(err => {
      console.log(err);
    })
  }

  reloadServices() {
    this.getServices(this);
  }

  async handleAddBilDetail(e) {
    e.preventDefault();
    await this.clearBillDetails(this);
    await this.addBillDetail(this);
    await this.props.onClickCancel();
  }

  async clearBillDetails(e) {
    await axios.delete("/bill/delete-bill-details", {
      params: {
        bill: e.state.bill._id
      }
    }).then(response => {
      console.log(response.data);
    }).catch(err => console.log(err));
  }

  async addBillDetail(e) {
    await axios.post("/bill/bill-detail/insert", {
      apartment: e.props.match.params.id,
      bill: e.state.bill._id,
      billDetails: e.state.billDetails
    }).then(async response => {
      let success = response.data.success
      if (!success) {
        e.setState({ errors: response.data.errors });
      } else {
        alert(response.data.message);
        this.calculateTotal();
        await this.updateBill(this);
      }
    })
  }

  async getBill(e) {
    await axios.get("/bill/get-bill", {
      params: {
        flatName: e.state.flatName,
        month: e.state.month,
        year: e.state.year
      }
    }).then(async response => {
      await e.setState({ bill: response.data });
    }).catch(err => {
      console.log("err", err);
    })
  }

  async getBillDetails (e) {
    await axios
      .get ('/bill/get-bill-detail', {
        params: {
          bill: e.state.bill._id,
        },
      })
      .then (response => {
        let details = response.data;
        details.forEach(detail => {
          let i = _.findIndex(e.state.service, function (item) {
            return item._id === detail.service
          })
          console.log("i", i);
          let billDetail = {}
          billDetail.serviceName = e.state.service[i].name
          billDetail.amount = detail.amount
          e.setState({ billDetails: [...this.state.billDetails, billDetail] })
        })
      })
      .catch (err => console.log ('err', err));
  }

  getMonthOfBill() {
    let arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return arr[this.state.month - 1] + " " + this.state.year;
  }

  async updateBill(e) {
    await axios.put("/bill/update-bill", {
      id: e.state.bill._id,
      total: e.state.total
    }).then(response => {
      alert(response.data);
    }).catch(err => {
      console.log('err', err);
    })
  }

  calculateTotal() {
    let total = 0
    this.state.billDetails.forEach(billDetail => {
      let i = _.findIndex(this.state.service, function (service) {
        return service.name === billDetail.serviceName
      })
      total += billDetail.amount * this.state.service[i].fee
    })
    this.setState({total});
  }

  handleClickAddService() {
    let billDetail = {}
    billDetail.serviceName = ''
    billDetail.amount = 0
    this.setState({
      billDetails: [...this.state.billDetails, billDetail]
    })
  }

  handleTextChange(e) {
    this.setState({ errors: {} });
    let billDetails = this.state.billDetails
    if (e.target.name == "flatname")
      this.setState({ flatName: e.target.value })
    if (e.target.name == 'servicename') {
      billDetails[e.target.id].serviceName = e.target.value
      this.setState({ billDetails });
    }
    if (e.target.name == 'amount') {
      billDetails[e.target.id].amount = e.target.value
      this.setState({ billDetails });
    }

  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  onClickDelete(e) {
    e.preventDefault();
    let i = e.target.id
    this.state.billDetails.splice(i, 1);
    this.setState({ billDetails: [...this.state.billDetails]});
  }

  disabledOption(array, name) {
    let i = _.findIndex(array, (item) => {
      return item.serviceName === name
    })
    if (i >= 0)
      return true;
    else return false;
  }

  render() {
    return pug`
    .add-bill-detail
      h3.grey Change Bill Detail
      button.cancel(onClick = this.props.onClickCancel) Cancel
      button.add-service.btn-primary(onClick = this.togglePopup) +
      if(this.state.showPopup)
          CreatePopup(closePopup=this.togglePopup, reloadServices = this.reloadServices, admin=this.state.user._id)
      form
        if (this.state.errors)
          span.error #{this.state.errors.bill}
        .form-group.detail 
          label(for='flatname') Flat Name:
          span #{this.state.flatName}
          if (this.state.errors)
            span.error #{this.state.errors.flatName}
        .form-group.detail
          label(for='month') Bill Of Month:
          span #{this.getMonthOfBill()}
        .line-divide
        each item, index in this.state.billDetails
          .service-item(key=index)
            button.delete-service-item.pull-right(id=index, onClick=this.onClickDelete) x
            .form-group
              label(for=index) Service Name:
              select.form-control(id=index, type='text', name='servicename', value=item.serviceName, onChange=this.handleTextChange)
                option(value="", disabled) -- Select service --
                each service in this.state.service
                  option(key=service._id, value=service.name, disabled=this.disabledOption(this.state.billDetails, service.name)) #{service.name}
              if (this.state.errors[index])
                span.error #{this.state.errors[index].serviceName}
            .form-group
              label(for=index) Amount:
              input.form-control(id=index, type='text', name='amount', placeholder='Amount', value=item.amount, onChange=this.handleTextChange)
              if (this.state.errors[index])
                span.error #{this.state.errors[index].amount}
            .line-divide
        .add-bill-form(onClick=this.handleClickAddService)
          i.ion-android-add
          span Add Item ...
        button.btn.btn-primary#add(type='submit', onClick=this.handleAddBilDetail, disabled=_.isEmpty(this.state.billDetails)) Save Change
    `;
  };
}

export default withRouter(AddBill);