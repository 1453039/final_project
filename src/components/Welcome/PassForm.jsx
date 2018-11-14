import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class PassForm extends React.Component {
	constructor (props) {
    super(props);
    this.state = {
      apartment: [],
      password: '',
      id: this.props.id,
      id_user: this.props.history.location.state.id_user
    }
    this.handlePassChange = this.handlePassChange.bind(this);
    this.getApartment = this.getApartment.bind(this);
    this.updatePasswordUser = this.updatePasswordUser.bind(this);
  }
  
  componentDidMount(){
    this.getApartment(this);
  }

	handlePassChange (e) {
		this.setState ({
      password: e.target.value,
		});
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
  
	handleClickNext() {
    this.updatePasswordUser()
    this.props.history.push('@'+ this.state.id + '?newfeeds');
  }
  
  render() {
    const {apartment} = this.state
		return pug`
			.login-form.col-md-5.col-sm-5
					#wrapper
						h2.text-white Welcome to #{apartment.name}
						.line-divider
						h2.text-white Enter your password
						form(action="#")
							fieldset.form-group
								input.form-control#example-email(type="password", placeholder="Your password", onChange=this.handleEmailChange)
							button.btn-secondary(onClick=this.handleClickNext.bind(this))
								span Next
		`;
  }
}

export default withRouter(PassForm);