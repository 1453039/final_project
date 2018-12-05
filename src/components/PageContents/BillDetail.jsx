import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BillDetail extends React.Component {
  constructor(){
    super();
    this.state={
      roll: 'member',
      date: 'January 2018',
      list:[
        {
          id: 0,
          flat: 'A1',
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
              fee: 20,
              unit: '',
              amount: 1
            },
            {
              id: 2,
              name: '',
              fee: '',
              unit: '',
              amount: ''
            }
          ]
        },
        {
          id: 1,
          flat: 'A111',
          isPaid: false,
          service:[
            {
              id: 0,
              name: 'aaaaaaaaaaaaa',
              fee: 12,
              unit: '',
              amount: 22
            },
            {
              id: 1,
              name: '',
              fee: 20,
              unit: '',
              amount: 1
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
      ]
    }
    this.calculateBill=this.calculateBill.bind(this);
  }
  calculateBill(num) {
    let sum = 0;
    const arr = this.state.list[num].service;
    for (let i=0; i<arr.length; i++) {
      sum = sum + arr[i].fee*arr[i].amount;
    };
    return sum;
  }
  render() {
    return pug`
      if (this.state.roll == 'member')
        .bill-detail
          h3.grey Monthly Bill Of Flat #{this.state.list[0].flat} On #{this.state.date}
          table.service-list
            thead
              tr
                th ID
                th Service Name
                th Fee
                th Unit
                th Amount
            tbody
              each item in this.state.list[0].service
                tr(key=item.id)
                  td.id #{item.id + 1}
                  td.service-name #{item.name}
                  td.fee #{item.fee}
                  td.unit #{item.unit}
                  td.amount #{item.amount}
          h4.grey Total: 
            span #{this.calculateBill(0)} VND
          button#pay.btn-primary(type='button') Pay
      else 
        .bill-detail  
          button.btn.btn-primary#add-bill Add Bill
          form.tool 
            select.sort-by(name='sort-by')
              option(selected) -- Sort By --
              option(value='flat-name') Flat Name
              option(value='paid') Paid
            div.form-group
              input(type="text", placeholder="Search flat...")
          .payment-title
            button.pre-month &larr;
            h3.grey Bills On #{this.state.date}
            button.next-month &rarr;
          table.bill-list
            thead
              tr
                th ID
                th Flat
                th Total
                th Paid
            tbody
              each mem in this.state.list
                tr(key=mem.id)
                  td.id #{mem.id + 1}
                  td.flat-num 
                    Link(to='/') #{mem.flat}
                  td.total #{this.calculateBill(mem.id)} VND
                  td.isPaid #{mem.isPaid}
        .pagi-block
          ul.pagination
            li.page-item.disabled
              Link(to='/').page-link &larr;
            li.page-item.active
              Link(to='/').page-link 1
            li.page-item
              Link(to='/').page-link 2
            li.page-item
              Link(to='/').page-link 3
            li.page-item
              Link(to='/').page-link &rarr;

    `;
  }
}

export default BillDetail;