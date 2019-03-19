import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import ChangeNameForm from './ChangeNameForm.jsx';

class NewPassForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      apartment: [],
      newPass: '',
      confirmPass: '',
      id: this.props.match.params.id,
      id_user: qs.parse(this.props.history.location.search),
      isNext: false,
      errors: {}
    }
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.getApartment = this.getApartment.bind(this);
  }

  componentDidMount(){
    this.getApartment(this);
  }

  handlePassChange (e) {
    if (e.target.name == "new-password")
      this.setState ({
        newPass: e.target.value,
        errors: {}
      });
    if (e.target.name == "confirm-password")
      this.setState ({
        confirmPass: e.target.value,
        errors: {}
      });
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
    await axios.put("/user/update_password", {
        id : seft.state.id_user,
        password: seft.state.newPass,
        password2: seft.state.confirmPass
    }).then(async (response) => {
      const success = response.data.success
      if (success) {
        seft.setState({ isNext: true });
        console.log(response.data.message);
      } else {
        seft.setState({ errors: response.data.errors });
      }
    }).catch(err => {
      console.log("err", err)
    })
  }
  
  render() {
    console.log("isNext", this.state.isNext);
    let disabled = this.state.newPass && this.state.confirmPass ? false : true
    if (!this.state.isNext)
      return pug`
        .login-form.col-md-5.col-sm-5
          #wrapper
            h2.text-white Welcome to #{this.state.apartment.name}
            .line-divider
            form(onSubmit=this.handleClickNext)
              h2.text-white Enter your new password
              fieldset.form-group
                input.form-control#password(type="password", name="new-password", placeholder="Your new password", onChange=this.handlePassChange)
              h2.text-white Confirm your password
              fieldset.form-group
                input.form-control#confirm-password(type="password", name="confirm-password", placeholder="Confirm your password", onChange=this.handlePassChange)
              if (this.state.errors)
                span.error 
                  strong #{this.state.errors.password2}
              button.btn-secondary(disabled=disabled)
                span Next
      `;
    else 
      return pug`
        ChangeNameForm(apartment=this.state.apartment, id_user=this.state.id_user)
      `;
  }
}

export default withRouter(NewPassForm);