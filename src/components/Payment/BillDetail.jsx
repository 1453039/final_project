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
    }
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
      isClickAddBill: !this.state.isClickAddBill
    })
  }

  render() {
    return pug`
      .payment-block
        if (!this.state.user.isAdmin)
          MemberView
        else 
          if(!this.state.isClickAddBill)
            AdminView(handleClickAddBill=this.handleClickAddBill, calculateBill=this.calculateBill)
          else
            AddBill(onClickCancel=this.handleClickAddBill)
    `;
  }
}

export default BillDetail;