import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MemberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: this.props.detail
    }
    this.handleClickPay = this.props.handleClickPay;
    this.calculateBill = this.props.calculateBill;
  }
  render() {
    return pug`
      .bill-detail
        .payment-title
            button.pre-month &larr;
            h3.grey Bills On #{this.state.detail.date}
            button.next-month &rarr;
        h4.grey.payment-detail Flat: #{this.state.detail.list[0].flat}
        table.service-list
          thead
            tr
              th ID
              th Service Name
              th Fee
              th Unit
              th Amount
          tbody
            each item in this.state.detail.list[0].service
              tr(key=item.id)
                td.id #{item.id + 1}
                td.service-name #{item.name}
                td.fee #{item.fee}
                td.unit #{item.unit}
                td.amount #{item.amount}
        h4.grey#total Total: 
          span #{this.calculateBill(0)} VND
        if !this.state.detail.isClickpay
          button#pay.btn-primary(type='button', onClick=this.handleClickPay) Pay
    `;
  }
}

export default MemberView;