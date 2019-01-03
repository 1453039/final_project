import React from 'react';
import { Link } from 'react-router-dom';
import CreatePopup from '../PageContents/CreatePopup.jsx'

class AddBill extends React.Component {
  constructor() {
    super();
    this.state = {
      amountService: [],
      showPopup: false,
      service: [
        {
          id: 0,
          name: 'Điện'
        },
        {
          id: 1,
          name: 'Nước'
        },
      ]
    }
    this.handleClickAddService = this.handleClickAddService.bind(this);
    this.reload = this.reloadPage.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }
  reloadPage() {
    location.reload();
  }
  handleClickAddService() {
    let num = {}
    let amountService = this.state.amountService.slice(0)
    num.id = this.state.amountService.length;
    amountService.push(num);
    this.setState({ amountService })
  }
  togglePopup(){
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log(1);
  }
  render() {
    return pug`
    .add-bill-detail
      h3.grey Add Bill Detail
      button.cancel(onClick = this.reload) Cancel
      button.add-service.btn-primary(onClick = this.togglePopup) +
      if(this.state.showPopup)
        CreatePopup(closePopup=this.togglePopup)
      form
        .form-group 
          label(for='flatname') Flat Name:
          input#flatname.form-control(type='text', name='flatname', placeholder='Flat Name')
        .form-group
          label(for='month') Bill Of Month:
          input#month.form-control(type='number', name='month', placeholder='Month', min='1', max='12')
        .line-divide
        each item in this.state.amountService
          .service-item(key=item.id)
            .form-group
              label(for='servicename') Service Name:
              select#servicename.form-control(type='text', name='servicename')
                option -- Select service --
                each item in this.state.service
                  option(key=item.id) #{item.name}
            .form-group
              label(for='amount') Amount:
              input#amount.form-control(type='text', name='amount', placeholder='Amount')
            .line-divide
        .add-bill-form(onClick=this.handleClickAddService)
          i.ion-android-add
          span Add Item ...
        button.btn.btn-primary#add(type='submit') Add
    `;
  };
}

export default AddBill;