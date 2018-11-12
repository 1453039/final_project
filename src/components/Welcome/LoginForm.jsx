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

<<<<<<< HEAD
  async handleClickNext (e) {
    e.preventDefault()
    var seft = this
    let listUsers = []
    let listApart = []
    await this.getListUser().then(async (response)=> {
      listUsers = response.data
      for (var id in listUsers){
        await seft.getListApart(listUsers[id]).then(function (res) {
          let data = res
          data.isAdmin = seft.isAdmin(listUsers,res)
          data.id_user = listUsers[id]._id 
          let tamole = []
          tamole.push(data)
          listApart = listApart.concat(tamole)
          seft.setState({listApart,
            isClick: true,})
        });
      }
=======
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
>>>>>>> 9d377cbf6eaaef32ad15c2329cd229288ac97470
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

<<<<<<< HEAD
  isAdmin(listUser,item){
    let index = _.findIndex(listUser,{"apartment":item._id})
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
    let disabled = email?false:true
=======
  render() {
    const { isClick, listUsers, listApart } = this.state;
>>>>>>> 9d377cbf6eaaef32ad15c2329cd229288ac97470
    return pug`
			if !isClick 
				.login-form.col-md-5.col-sm-5
					#wrapper
						h2.text-white Enter your email
						form(onSubmit=this.handleClickNext)
							fieldset.form-group
								input.form-control#example-email(type="text", name="email", placeholder="name@examle.com", value = this.state.email, onChange=this.handleEmailChange)
							button.btn-secondary(disabled=disabled)
								span Next
			else
<<<<<<< HEAD
				ListApart(listApart=listApart)
=======
				ListApart(listApart=listApart, listUsers = listUsers)
>>>>>>> 9d377cbf6eaaef32ad15c2329cd229288ac97470
		`;
  }
}

export default LoginForm;
