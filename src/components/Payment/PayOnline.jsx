import React, {Component} from  'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import stripe from '../../../server/config/stripe.jsx'

class PayOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'VND',
      description: this.props.description,
      amount: this.props.amount,
      email: this.props.email
    }
  }

  successPayment = data => {
    alert('Payment Successful');
    console.log(data);
  }

  errorPayment = data => {
    alert('Payment Error');
    console.log(data);
  };

  getToken = (e) => token => {
    axios.post('/payment/stripe/token', {
      description: e.state.description,
      source: token.id,
      currency: e.state.currency,
      amount: e.state.amount
    }).then(this.successPayment)
    .catch(this.errorPayment);
  }

  render() {
    return pug`
      StripeCheckout(name='CHECK OUT', description=this.state.description, email=this.state.email, amount=this.state.amount, token=this.getToken(this), currency=this.state.currency, stripeKey=stripe.STRIPE_PUBLIC_KEY)
    `;
  }
}

export default PayOnline;