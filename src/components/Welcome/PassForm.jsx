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
      id_user: this.props.history.location.state.id_user,
      errors: {}
    }
    this.saveToSession = this.saveToSession.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.getApartment = this.getApartment.bind(this);
  }
  
  componentDidMount(){
    this.getApartment(this);
  }

  handlePassChange (e) {
    this.setState ({
      password: e.target.value,
      errors: {}
    });
  }

  async saveToSession(e) {
    await axios.post("/user/save_to_session", {
      id: e.state.id_user
    }).then((response) => {
      console.log(response.data)
    }).catch(err => {
      console.log("err", err);
    })
  }

  async getApartment(e) {
    await axios.get("/apartment/get-apartment", {
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
  
  async handleClickNext(e) {
    e.preventDefault()
    let seft = this
    await axios.post("/user/login", {
        id : seft.state.id_user,
        password: seft.state.password
    }).then(async (response) => {
      const success = response.data.success
      if (success) {
        console.log(response.data.message);
        await seft.saveToSession(seft);
        await seft.props.history.push('@'+ seft.state.id + '?newfeeds');
      } else {
        seft.setState({ errors: response.data.errors });
      }
    }).catch(err => {
      console.log("err", err)
    })
  }
  
  render() {
    const {apartment, password} = this.state
    let disabled = password ? false : true
    if (this.state.id_user)
      return pug`
        .login-form.col-md-5.col-sm-5
          #wrapper
            h2.text-white Welcome to #{apartment.name}
            .line-divider
            h2.text-white Enter your password
            form(onSubmit=this.handleClickNext)
              fieldset.form-group
                input.form-control#example-email(type="password", placeholder="Your password", onChange=this.handlePassChange)
              if (this.state.errors)
                span.error 
                  strong #{this.state.errors.password}
              button.btn-secondary(disabled=disabled)
                span Next
      `;
    else this.props.history.push('/');
  }
}

export default withRouter(PassForm);