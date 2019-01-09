import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminView from './AdminView.jsx';
import MemberView from './MemberView.jsx';
import AddBill from './AddBill.jsx';

class BillDetail extends React.Component {
  constructor(){
    super();
    this.state={
      user: [],
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
              name: 'bbbbbbbbbbbb',
              fee: 20,
              unit: '',
              amount: 1
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
    this.calculateBill = this.calculateBill.bind(this);
    this.handleClickAddBill = this.handleClickAddBill.bind(this);
  }

  componentDidMount() {
    this.getUserFromSession(this);
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err =>{
      console.log("err", err);
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
        if (!this.state.user.isAdmin)
          MemberView(detail=this.state, calculateBill=this.calculateBill)
        else 
          if(!this.state.isClickAddBill)
            AdminView(detail=this.state, handleClickAddBill=this.handleClickAddBill, calculateBill=this.calculateBill)
          else
            AddBill
    `;
  }
}

export default BillDetail;