import React, {Component} from  'react';
import {Link} from 'react-router-dom';

class PayOnline extends React.Component {
  constructor() {
    super();
    this.reload = this.reloadPage.bind(this);
  }
  reloadPage() {
    console.log(1);
    location.reload();
  }
  render() {
    return pug`
      .checkout
        h3.grey Check Out
        button.cancel(onClick=this.reload) Cancel
        form
          .form-group 
            label(for='fname') Accepted Cards
            .icon-container
              i.fa.fa-cc-visa
              i.fa.fa-cc-amex
              i.fa.fa-cc-mastercard
              i.fa.fa-cc-discover
          .form-group
            label(for='cname') Name On Card:
            input#cname.form-control(type='text', name='cardname', placeholder='Name On Card')
          .form-group
            label(for='ccnum') Credit Card Number:
            input#ccnum.form-control(type='text', name='cardnumber', placeholder='Number On Card')
          .form-group
            label(for='cvv') CVV:
            input#cvv.form-control(type='text', name='cvv', placeholder='CVV')
          .form-group
            label(for='expmonth') Exp Month:
            input#expmonth.form-control(type='text', name='expmonth', placeholder='Exp Month')
          .form-group
            label(for='expyear') Exp Year:
            input#expyear.form-control(type='text', name='expyear', placeholder='Exp Year')
          button.btn.btn-primary(type='submit') Continue Check Out
    `;
  }
}

export default PayOnline;