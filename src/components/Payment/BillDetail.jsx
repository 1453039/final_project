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
      flat: '',
      month: '',
      year: '',
      loading: true
    }
    this.handleClickAddBill = this.handleClickAddBill.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
  }

  async componentDidMount() {
    await this.getUserFromSession(this);
    await this.setState({ loading: false });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isAdminViewDetail: nextProps.location.state.isAdminViewDetail, isClickAddBill: nextProps.location.state.isClickAddBill, flat: nextProps.location.state.flat, month: nextProps.location.state.month, year: nextProps.location.state.year})
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
        if (this.state.loading == false)
          if (this.state.user.isAdmin == false || this.state.isAdminViewDetail)
            MemberView(flat=this.state.flat, month=this.state.month, year=this.state.year, handleClickBack = this.handleClickBack)
          else 
            if(!this.state.isClickAddBill)
              AdminView(calculateBill=this.calculateBill)
            else
              AddBill(onClickCancel=this.handleClickAddBill, flat=this.state.flat, month=this.state.month, year=this.state.year)
    `;
  }
}

export default withRouter(BillDetail);