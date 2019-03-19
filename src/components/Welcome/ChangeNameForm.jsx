import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class ChangeNameForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      apartment: this.props.apartment,
      name: '',
      id: this.props.match.params.id,
      id_user: this.props.id_user
    }
    this.saveToSession = this.saveToSession.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange (e) {
    this.setState ({
      name: e.target.value,
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

  async handleClickNext(e) {
    e.preventDefault()
    let seft = this
    await axios.put("/user/update-name", {
        id : seft.state.id_user,
        name: seft.state.name
    }).then(async (response) => {
      await seft.saveToSession(seft);
      await seft.props.history.push('@'+ seft.state.id + '?newfeeds');
      console.log(response.data);
    }).catch(err => {
      console.log("err", err)
    })
  }
  
  render() {
    const {apartment, name} = this.state
    let disabled = name ? false : true
    return pug`
      .login-form.col-md-5.col-sm-5
        #wrapper
          h2.text-white Welcome to #{apartment.name}
          .line-divider
          form(onSubmit=this.handleClickNext)
            h2.text-white Enter your name
            fieldset.form-group
              input.form-control#example-email(type="text", placeholder="Your name", onChange=this.handleNameChange)
            if (this.state.errors)
              span.error 
                strong #{this.state.errors.password}
            button.btn-secondary(disabled=disabled)
              span Next
    `;
  }
}

export default withRouter(ChangeNameForm);