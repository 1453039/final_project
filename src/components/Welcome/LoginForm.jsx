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
      listApart: [],
      errors: []
    };
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.getListUser = this.getListUser.bind(this);
    this.getListApart = this.getListApart.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
  }
  handleEmailChange(e) {
    this.setState({
      errors: {},
      email: e.target.value
    });
  }

  async handleClickNext(e) {
    try {
      e.preventDefault()
      var seft = this
      let listUsers = []
      await this.getListUser().then(async (response) => {
        let message = response.data.message;
        if (message == 'fail') {
          seft.setState({ errors: response.data.value })
        }
        else {
          listUsers = response.data.value
          for (var id in listUsers) {
            await seft.getListApart(listUsers[id]).then(function (res) {
              let data = res
              data.isAdmin = seft.isAdmin(listUsers, res)
              data.id_user = listUsers[id]._id
              seft.setState({
                listApart: [...seft.state.listApart, data],
                isClick: true,
              })
            });
          }
        }
      });
    }
    catch (error) {
      console.log("error", error);
    }
  }

  isAdmin(listUser, item) {
    let index = _.findIndex(listUser, { "apartment": item._id })
    return listUser[index].isAdmin
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
    const { isClick, listApart, email } = this.state
    let disabled = email ? false : true
    return pug`
      if !isClick 
        .login-form.col-md-5.col-sm-5
          #wrapper
            h2.text-white Enter your email
            form(onSubmit=this.handleClickNext)
              fieldset.form-group
                input.form-control#example-email(type="text", name="email", placeholder="name@example.com", value = this.state.email, onChange=this.handleEmailChange)
              if (this.state.errors)
                span.error 
                  strong #{this.state.errors.email}
              button.btn-secondary(disabled=disabled)
                span Next
      else
        ListApart(listApart=listApart)
    `;
  }
}

export default LoginForm;
