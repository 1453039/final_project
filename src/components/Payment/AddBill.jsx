import React from 'react';
import { Link } from 'react-router-dom';

class AddBill extends React.Component {
  constructor() {
    super();
    this.state = {
      amountService: [],
    }
    this.handleClickAddService = this.handleClickAddService.bind(this);
    this.reload = this.reloadPage.bind(this);
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
  render() {
    return pug`
    .add-bill-detail
      h3.grey Add Bill Detail
      button.cancel(onClick = this.reload) Cancel
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
              input#servicename.form-control(type='text', name='servicename', placeholder='Service Name')
            .form-group
              label(for='unit') Unit:
              input#unit.form-control(type='text', name='unit', placeholder='Unit')
            .form-group
              label(for='amount') Amount:
              input#amount.form-control(type='text', name='amount', placeholder='Amount')
            .line-divide
        .add-bill-form(onClick=this.handleClickAddService)
          i.ion-android-add
          span Add Service ...
        button.btn.btn-primary(type='submit') Add
    `;
  };
}

export default AddBill;