import React, { PureComponent } from 'react';
import '../../../public/styles/Info.scss';
import InfoMenu from './InfoMenu.jsx'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom';

class EditPass extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      password2: '',
      errors: {},
      user: []
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getUserFromSession(this);
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err => {
      console.log("err", err);
    })
  }

  onInputChange(e) {
    this.setState({ errors: {} });
    if (e.target.name == 'old-password')
      this.setState({ oldPassword: e.target.value })
    if (e.target.name == 'password')
      this.setState({ password: e.target.value })
    if (e.target.name == 'confirm-password')
      this.setState({ password2: e.target.value })
  }

  async handleSubmit() {
    await axios.post("/user/change_password", {
      id: this.state.user._id,
      oldPassword: this.state.oldPassword,
      password: this.state.password,
      password2: this.state.password2
    }).then(response => {
      const success = response.data.success;
      if (success) {
        alert(response.data.message);
        this.setState({
          oldPassword: '',
          password: '',
          password2: ''
        })
      } else
        this.setState({ errors: response.data.errors });
    }).catch(err => console.log('err', err));
  }

  render() {
    return pug`
      #page-contents
        .row
          .col-md-4
            InfoMenu
          .col-md-6
            .edit-profile-container
              .block-title
                h4.grey 
                  i.icon.ion-ios-locked-outline
                  | Edit password
              .edit-block
                form.form-inline#education(name='update-pass')
                .row
                  .form-group.col-xs-12
                    label(for='old-password') Old password
                    input#my-password.form-control.input-group-lg(type='password', name='old-password', title='Enter password', placeholder='Old password', value=this.state.oldPassword, onChange=this.onInputChange, required)
                    if (this.state.errors)
                      span.error #{this.state.errors.oldPassword}
                .row
                  .form-group.col-xs-6
                    label(for='password') New password
                    input#new-pass.form-control.input-group-lg(type='password', name='password', title='Enter password', placeholder='New password', value=this.state.password, onChange=this.onInputChange, required)
                    if (this.state.errors)
                      span.error #{this.state.errors.password}
                  .form-group.col-xs-6
                    label(for='confirm-password') Confirm password
                    input#confirm-new-pass.form-control.input-group-lg(type='password', name='confirm-password', title='Enter password', placeholder='Confirm password', value=this.state.password2, onChange=this.onInputChange, required)
                    if (this.state.errors)
                      span.error #{this.state.errors.password2}
                p
                  Link(to='?change-password') Forgot password?
                button.btn.btn-primary.info(type='submit', onClick=this.handleSubmit) Update password
    `;
  }
}

export default withRouter(EditPass);