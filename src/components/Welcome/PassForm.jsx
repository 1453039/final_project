import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class PassForm extends React.Component {
	constructor (props) {
    super(props);
    this.state = {
      apartment: [],
      password: '',
      id: this.props.match.params.id,
      id_user: this.props.history.location.state.id_user
    }
    this.saveToSession = this.saveToSession.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.getApartment = this.getApartment.bind(this);
    this.updatePasswordUser = this.updatePasswordUser.bind(this);
  }
  
  componentDidMount(){
    this.getApartment(this);
  }

  componentWillUnmount(){
    this.saveToSession(this);
  }

	handlePassChange (e) {
		this.setState ({
      password: e.target.value,
		});
  }

  saveToSession(e) {
    axios.post("/members/save_to_session", {
      id: e.state.id_user
    }).then((response) => {
      console.log(response.data)
    }).catch(err => {
      console.log("err", err);
    })
  }

  updatePasswordUser() {
    let seft = this
    axios.post("/members/update_password", {
        id : seft.state.id_user,
        password: seft.state.password
    }).then((response) => {
      console.log(response.data);
    }).catch(err => {
      console.log("err", err)
    })
  }

  getApartment(e) {
    axios.get("/apartment/get-apartment", {
      params: {
        id_apartment : e.state.id
      }
    }).then((response) => {
      e.setState({
        apartment: response.data
      })
    }).catch(err => {
      console.log("err", err)
    })
  }
  
	handleClickNext(e) {
    e.preventDefault()
    this.updatePasswordUser()
    this.props.history.push('@'+ this.state.id + '?newfeeds');
  }
  
  render() {
    const {apartment, password} = this.state
    let disabled = password ? false : true
		return pug`
			.login-form.col-md-5.col-sm-5
					#wrapper
						h2.text-white Welcome to #{apartment.name}
						.line-divider
						h2.text-white Enter your password
						form(onSubmit=this.handleClickNext)
							fieldset.form-group
								input.form-control#example-email(type="password", placeholder="Your password", onChange=this.handlePassChange)
							button.btn-secondary(disabled=disabled)
								span Next
		`;
  }
}

export default withRouter(PassForm);