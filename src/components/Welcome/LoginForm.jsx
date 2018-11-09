import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import ListApart from './ListApart.jsx';
import _ from "lodash"

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      listUsers: [],
      isClick: false,
      listApart: []
    };
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.getListUser = this.getListUser.bind(this);
    this.getListApart = this.getListApart.bind(this);
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleClickNext() {
    var seft = this
    let listUsers = []
    let listApart = []
    this.getListUser().then(function (response) {
      listUsers = response.data
      for (var id in listUsers)
        seft.getListApart(listUsers[id]).then(function (response) {
          listApart.push(response)
        });
      seft.setState({
        listUsers,
        listApart
      });
    });

    if (this.state.email)
      this.setState({
        isClick: true,
      });
  }

  async getListUser() {
    try {
      let result = await axios.get('/apartment/get-list-apartment', {
        params: {
          email: this.state.email
        }
      });
      return result;
    }
    catch (error) {
      console.log("error", error);
    }
  }

  async getListApart(user) {
    try {
      let result = await axios.get('/apartment/get-apartment', {
        params: {
          id_apartment: user.apartment
        }
      });
      return result.data;
    }
    catch (error) {
      console.log("error", error);
    };
  }

  render() {
    const { isClick, listUsers, listApart } = this.state;
    return pug`
			if !isClick
				.login-form.col-md-5.col-sm-5
					#wrapper
						h2.text-white Enter your email
						form(action="#")
							fieldset.form-group
								input.form-control#example-email(type="text", name="email", placeholder="name@examle.com", value = this.state.email, onChange=this.handleEmailChange)
							button.btn-secondary(onClick=this.handleClickNext)
								span Next
			else
				ListApart(listApart=listApart, listUsers = listUsers)
		`;
  }
}

export default LoginForm;
