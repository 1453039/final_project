import React, { Component } from 'react';

class BillDetail extends React.Component {
  constructor(){
    super();
    this.state={
      date: '',
      isPaid: false,
      service:[
        {
          id: 0,
          name: 'aaaaaaaaaaaaa',
          fee: 111,
          unit: '',
          amount: 111
        },
        {
          id: 1,
          name: '',
          fee: '',
          unit: '',
          amount: ''
        },
        {
          id: 2,
          name: '',
          fee: '',
          unit: '',
          amount: ''
        }
      ]
    }
    this.calculateBill=this.calculateBill.bind(this);
  }
  calculateBill() {
    let sum = 0;
    const arr = this.state.service;
    for (let i=0; i<arr.length; i++) {
      sum = sum + arr[i].fee*arr[i].amount;
    };
    return sum;
  }
  render() {
    return pug`
      .bill-detail
        h3.grey Monthly Bill
        table.service-list
          thead
            tr
              th ID
              th Service Name
              th Fee
              th Unit
              th Amount
          tbody
            each item in this.state.service
              tr(key=item.id)
                td.id #{item.id + 1}
                td.service-name #{item.name}
                td.fee #{item.fee}
                td.unit #{item.unit}
                td.amount #{item.amount}
        h4.grey Total: #{this.calculateBill()}
        button.btn-primary(type='button') Pay
    `;
  }
}

export default BillDetail;