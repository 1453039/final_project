import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
      isAdminViewDetail: false,
      flat: ''
    }
    this.handleClickAddBill = this.handleClickAddBill.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  componentDidMount() {
    this.getUserFromSession(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isAdminViewDetail: nextProps.location.state.isAdminViewDetail, flat: nextProps.location.state.flat })
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

  handleClickBack() {
    this.setState({ isAdminViewDetail: false })
  }

  render() {
    return pug`
      .payment-block
        if (!this.state.user.isAdmin || this.state.isAdminViewDetail)
          MemberView(flat=this.state.flat, handleClickBack = this.handleClickBack)
        else 
          if(!this.state.isClickAddBill)
            AdminView(handleClickAddBill=this.handleClickAddBill, calculateBill=this.calculateBill)
          else
            AddBill(onClickCancel=this.handleClickAddBill)
    `;
  }
}

export default withRouter(BillDetail);