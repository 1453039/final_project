import React, { Component } from 'react';
import '../../../public/styles/Info.scss';
import InfoMenu from './InfoMenu.jsx'
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class MyInfo extends Component {
	constructor(){
		super();
		this.state= {
      user:[]
    }
    this.getUserFromSession = this.getUserFromSession.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
  }

	onChangeName(e) {
		this.setState({ user: {name : e.target.value}});
	}
	onChangeBirthday(e) {
		this.setState({ user: {birthday : e.target.value}});
  }
  onChangeGender(e) {
    if (e.target.name == "female") {
      this.setState({
        user: {sex : e.target.value}
      })
    }
    if (e.target.name == "male") {
      this.setState({
        user: {sex : e.target.value}
      })
    }
  }
  
  componentWillMount() {
    this.getUserFromSession(this);
  }

  async getUserFromSession(e) {
    await axios.get("/members/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err =>{
      console.log("err", err);
    })
  }

  render() {
    const user = this.state.user
    return pug`
			#page-contents
				.row
					.col-md-4
						InfoMenu
					.col-md-5
						.edit-profile-container
							.block-title
								h4.grey 
									i.icon.ion-android-checkmark-circle
									| Edit basic information
							.edit-block
								form.form-inline#basic.info(name='basic-info')
								.row
									.form-group.col-xs-12
										label(for='fullname') My full name
										input#fullname.form-control.input-group-lg(type='text', name='fullname', title='Enter full name', placeholder='Full name', onChange=this.onChangeName, value=user.name)
								.row
									.form-group.col-xs-12
										label(for='email') My email
										input#email.form-control.input-group-lg(type='text', name='email', title='Enter email', placeholder='Email', value=user.email, disabled)
								.row
									.form-group.col-xs-12
										label(for='room') My flat
										input#room.form-control.input-group-lg(type='text', name='room', title='Enter flat', placeholder='Flat', value=user.flat, disabled)
								.row
									.form-group.col-xs-12
										label(for='birthday') Date of birth
										input#birthday.form-control.input-group-lg(type='date', name='birthday', title='Enter birthday', placeholder='birthday', value=user.birthday, onChange=this.onChangeBirthday)
								.form-group.gender
									span.custom-label 
										strong I am a:
									label#female.radio-inline Female
										input(type='radio', name='female', value='female', onChange=this.onChangeGender, checked=user.sex=='female')
									label#male.radio-inline Male
										input(type='radio', name='male', value='male',  onChange=this.onChangeGender, checked=user.sex=='male')
								button.info.btn.btn-primary(method='post', type='submit') Save change
		`;
  }
}

export default MyInfo;