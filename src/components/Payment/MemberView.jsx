import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PayOnline from './PayOnline.jsx';

class MemberView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: this.props.detail
    }
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
          span #{this.calculateBill(0).toLocaleString()} VND
        .payment-button
          PayOnline(email='cquyen0403@gmail.com', amount=this.calculateBill(0), description='Flat ' + this.state.detail.list[0].flat + ' - ' + this.state.detail.date)
    `;
  }
}

export default MemberView;