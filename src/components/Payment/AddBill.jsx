import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import CreatePopup from '../PageContents/CreatePopup.jsx'

class AddBill extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      addedBill: false,
      addedBillDetail: false,
      amountService: [],
      billDetails: [],
      showPopup: false,
      flatName: '',
      month: '',
      year: '',
      bill: {},
      service: [],
      errors: [],
      total: 0
    }
    this.handleClickAddService = this.handleClickAddService.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddBill = this.handleAddBill.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.getMonthOfBill = this.getMonthOfBill.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.handleAddBilDetail = this.handleAddBilDetail.bind(this);
  }

  componentDidMount() {
    this.getServices(this);
    let now = new Date();
    let currentMonth = now.getMonth() + 1
    if (currentMonth == 1) {
      this.setState({ month: 12, year: now.getFullYear() - 1 })
    } else
      this.setState({ month: currentMonth - 1, year: now.getFullYear() });
    let myThis = this
    window.onbeforeunload = function (e) {
      e.preventDefault();
      if (myThis.state.addedBill)
        myThis.deleteBill(myThis);
    }
  }

  async getServices(e) {
    await axios.get("/service/get-services", {
      params: {
        apartment: e.props.match.params.id
      }
    }).then(response => {
      e.setState({ service: response.data });
    }).catch(err => {
      console.log(err);
    })
  }

  handleAddBill(e) {
    e.preventDefault();
    this.addBill(this);
  }

  async addBill(e) {
    await axios.post("/bill/insert", {
      apartment: e.props.match.params.id,
      flatName: e.state.flatName,
      month: e.state.month,
      year: e.state.year
    }).then(response => {
      let success = response.data.success
      if (!success)
        e.setState({ errors: response.data.errors })
      else {
        alert(response.data.message);
        this.setState({ 
          addedBill: !this.state.addedBill,
          billDetails: []
        })
      }
    })
  }

  async handleAddBilDetail(e) {
    e.preventDefault();
    await this.getBill(this);
    await this.addBillDetail(this);
  }

  async addBillDetail(e) {
    await axios.post("/bill/bill-detail/insert", {
      apartment: e.props.match.params.id,
      bill: e.state.bill._id,
      billDetails: e.state.billDetails
    }).then(response => {
      let success = response.data.success
      if (!success) {
        e.setState({ errors: response.data.errors });
      } else {
        alert(response.data.message);
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

  async deleteBill(e) {
    await axios.delete("/bill/delete", {
      params: {
        flatName: e.state.flatName,
        month: e.state.month,
        year: e.state.year
      }
    }).then(response => {
      alert(response.data);
    }).catch(err => {
      console.log("err", err);
    })
  }

  getMonthOfBill() {
    let arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return arr[this.state.month - 1] + " " + this.state.year;
  }

  handleClickAddService() {
    let num = {}
    let billDetail = {}
    billDetail.serviceName = ''
    billDetail.amount = 0
    let amountService = this.state.amountService.slice(0)
    num.id = this.state.amountService.length;
    amountService.push(num);
    this.setState({
      amountService,
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

  onClickCancel() {
    this.deleteBill(this);
    this.setState({ addedBill: !this.state.addedBill , flatName: '' });
  }

  render() {
    return pug`
    .add-bill-detail
      h3.grey Add Bill 
        if (this.state.addedBill)
          | Detail
      if (!this.state.addedBill)
        button.cancel(onClick = this.props.onClickCancel) Cancel
      else
        button.cancel(onClick = this.onClickCancel) Cancel
      if (this.state.addedBill)
        button.add-service.btn-primary(onClick = this.togglePopup) +
        if(this.state.showPopup)
          CreatePopup(closePopup=this.togglePopup)
      form
        if (this.state.errors)
          span.error #{this.state.errors.bill}
        .form-group 
          label(for='flatname') Flat Name:
          input#flatname.form-control(type='text', name='flatname', placeholder='Flat Name', value=this.state.flatName, onChange=this.handleTextChange, disabled=this.state.addedBill ? true : false)
          if (this.state.errors)
            span.error #{this.state.errors.flatName}
        .form-group
          label(for='month') Bill Of Month:
          span #{this.getMonthOfBill()}
        if (!this.state.addedBill)
          button.btn.btn-primary#add(type='submit', onClick=this.handleAddBill) Add Bill
        else 
          .line-divide
          each item in this.state.amountService
            .service-item(key=item.id)
              .form-group
                label(for=item.id) Service Name:
                select.form-control(id=item.id, type='text', name='servicename', value=this.state.billDetails[item.id].serviceName, onChange=this.handleTextChange)
                  option(value="", disabled) -- Select service --
                  each item in this.state.service
                    option(key=item._id, value=item.name) #{item.name}
                if (this.state.errors[item.id])
                  span.error #{this.state.errors[item.id].serviceName}
              .form-group
                label(for=item.id) Amount:
                input.form-control(id=item.id, type='text', name='amount', placeholder='Amount', value=this.state.billDetails[item.id].amount, onChange=this.handleTextChange)
                if (this.state.errors[item.id])
                  span.error #{this.state.errors[item.id].amount}
              .line-divide
          .add-bill-form(onClick=this.handleClickAddService)
            i.ion-android-add
            span Add Item ...
          button.btn.btn-primary#add(type='submit', onClick=this.handleAddBilDetail, disabled=_.isEmpty(this.state.billDetails)) Add
    `;
  };
}

export default withRouter(AddBill);