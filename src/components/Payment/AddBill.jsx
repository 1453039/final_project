import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import CreatePopup from '../PageContents/CreatePopup.jsx'

class AddBill extends React.Component {
  constructor() {
    super();
    this.state = {
      addedBill: false,
      amountService: [],
      billDetails: [],
      showPopup: false,
      flatName: '',
      month: '',
      year: '',
      service: [],
      errors: [],
      total: 0
    }
    this.handleClickAddService = this.handleClickAddService.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddBill = this.handleAddBill.bind(this);
    this.reload = this.reloadPage.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.getMonthOfBill = this.getMonthOfBill.bind(this);
  }

  componentDidMount() {
    this.getServices(this);
    // window.onbeforeunload = function() {
    // }
    let now = new Date();
    let currentMonth = now.getMonth() + 1
    if (currentMonth == 1) {
      this.setState({ month: 12, year: now.getFullYear() - 1})
    } else
      this.setState({month: currentMonth - 1, year: now.getFullYear()});
  }

  async getServices(e) {
    await axios.get("/service/get-services", {
      params: {
        apartment: e.props.match.params.id
      }
    }).then(response => {
      e.setState({ service: response.data});
    }).catch(err => {
      console.log(err);
    })
  }

  reloadPage() {
    location.reload();
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
        e.setState({ errors: response.data.errors})
      else {
        alert(response.data.message);
        this.setState({ addedBill: !this.state.addedBill })
      }
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
    this.setState({errors: {}});
    let billDetails = this.state.billDetails
    if (e.target.name == "flatname")
      this.setState({ flatName: e.target.value})
    if (e.target.name == 'servicename') {
      billDetails[e.target.id].serviceName = e.target.value
      this.setState({ billDetails });
    }
    if (e.target.name == 'amount') {
      billDetails[e.target.id].amount = e.target.value
      this.setState({ billDetails });
    }
    
  }

  togglePopup(){
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {
    return pug`
    .add-bill-detail
      h3.grey Add Bill 
        if (this.state.addedBill)
          | Detail
      button.cancel(onClick = this.reload) Cancel
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
              .form-group
                label(for=item.id) Amount:
                input.form-control(id=item.id, type='text', name='amount', placeholder='Amount', value=this.state.billDetails[item.id].amount, onChange=this.handleTextChange)
              .line-divide
          .add-bill-form(onClick=this.handleClickAddService)
            i.ion-android-add
            span Add Item ...
          button.btn.btn-primary#add(type='submit') Add
    `;
  };
}

export default withRouter(AddBill);