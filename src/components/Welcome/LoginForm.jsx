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
    this.getListUser();
    // this.getListApart();
    // if (this.state.email)
    //   this.setState({
    //     isClick: true,
    //   });
  }

  getListUser() {
    const myThis = this
    axios.get('/apartment/get-list-apartment', {
      params: {
        email: this.state.email
      }
    }).then(function (response) {
      if (response.data && response.data.length > 0)
      for (var user in response.data)
        axios.get('/apartment/get-apartment', {
          params: {
            id_apartment: user.apartment
          }
        }).then(function (res) {
          console.log("response", res.data);
          myThis.state.listApart.push(res.data)
        })
          .catch(error => {
            console.log(error);
          });
    })
      .catch(error => {
        console.log("error", error);
      });
  }

  // getListApart() {
  //   const myThis = this
  //   if (this.state.listUsers && this.state.listUsers.length > 0)
  //     for (var user in this.state.listUsers)
  //       axios.get('/apartment/get-apartment', {
  //         params: {
  //           id_apartment: user.apartment
  //         }
  //       }).then(function (response) {
  //         console.log("response", response.data);
  //         myThis.state.listApart.push(response.data)
  //       })
  //         .catch(error => {
  //           console.log(error.response);
  //         });
  // }

  render() {

    const { isClick } = this.state;
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
				ListApart(listApart=this.state.listApart, listUsers = this.state.listUsers)
		`;
  }
}

export default LoginForm;
