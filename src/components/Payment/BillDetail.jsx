import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminView from './AdminView.jsx';
import MemberView from './MemberView.jsx';
import PayOnline from './PayOnline.jsx';
import AddBill from './AddBill.jsx';

class BillDetail extends React.Component {
  constructor(){
    super();
    this.state={
      role: 'admin',
      isClickPay: false,
      isClickAddBill: false,
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
    this.handleClickPay = this.handleClickPay.bind(this);
    this.calculateBill = this.calculateBill.bind(this);
    this.handleClickAddBill = this.handleClickAddBill.bind(this);
  }
  handleClickPay() {
    this.setState({
      isClickPay: true
    })
  }
  handleClickAddBill() {
    this.setState({
      isClickAddBill: true
    })
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
      .payment-block
        if (this.state.role == 'admin')
          if(!this.state.isClickPay)
            MemberView(detail=this.state, handleClickPay=this.handleClickPay, calculateBill=this.calculateBill)
          else 
            PayOnline
        else 
          if(!this.state.isClickAddBill)
            AdminView(detail=this.state, handleClickAddBill=this.handleClickAddBill, calculateBill=this.calculateBill)
          else
            AddBill
    `;
  }
}

export default BillDetail;