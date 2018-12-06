import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminView from './AdminView.jsx';
import MemberView from './MemberView.jsx';
import PayOnline from './PayOnline.jsx';

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
  }
  render() {
    return pug`
      .payment-block
        if (this.state.roll == 'member')
          MemberView(detail=this.state)
        else 
          AdminView(detail=this.state)
        PayOnline
    `;
  }
}

export default BillDetail;