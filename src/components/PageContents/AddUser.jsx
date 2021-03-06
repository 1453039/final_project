import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import '../../../public/styles/AddUser.scss';
import DEFAULT_AVATAR from '../../../public/images/avatar-default.png'
import DEFAULT_COVER from '../../../public/images/default-cover.jpg'

class AddUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      flat: '',
      isAdmin: false,
      messageFromServer: '',
      modalIsOpen: false,
      id: this.props.match.params.id,
      errors: {}
    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewUser = this.insertNewUser.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.sendMail = this.sendMail.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
  closeModal() {
    this.setState({
      email: '',
      flat: '',
      isAdmin: false,
      modalIsOpen: false,
      messageFromServer: '',
      errors: {}
    });
  }
  async onClick(e) {
    e.preventDefault();
    await this.insertNewUser(this);
    if (this.state.messageFromServer)
      await this.sendMail(this);
    await this.props.reloadMemberList();
  }
  async insertNewUser(e) {
    try {
      await axios.post('/user/insert', {
        email: e.state.email,
        flat: e.state.isAdmin ? '' : e.state.flat,
        isAdmin: e.state.isAdmin,
        id: e.state.id,
        avatar: DEFAULT_AVATAR,
        cover: DEFAULT_COVER
      }).then(function (response) {
        let success = response.data.success
        if (!success)
        e.setState({ errors: response.data.errors });
        else e.setState({ messageFromServer: response.data.message });
      })
    }
    catch (error) {
      console.log("error", error);
    }
  }
  async sendMail(e) {
    try {
      await axios.post('/user/send', {
        email: e.state.email,
        id: e.state.id
      }).then((response) => {
        if (response.data.msg === 'success') {
          console.log("Message Sent.");
        } else if (response.data.msg === 'fail') {
          console.log("Message failed to send.")
        }
      })
    }
    catch (err) {
      console.log("err", err);
    }
  }
  handleTextChange(e) {
    this.setState({errors: {}});
    if (e.target.name == "email") {
      this.setState({
        email: e.target.value
      });
    }
    if (e.target.name == "flat") {
      this.setState({
        flat: e.target.value
      });
    }
  }

  str2bool(value) {
    if (value && typeof value === 'string') {
      if (value === "true") return true;
      if (value === "false") return false;
    }
    return value;
  }

  handleOptionChange(e) {
    if (e.target.name == "admin1") {
      this.setState({
        isAdmin: this.str2bool(e.target.value)
      });
    }
    if (e.target.name == "admin2") {
      this.setState({
        isAdmin: this.str2bool(e.target.value)
      });
    }
  }
  render() {
    if (!this.state.messageFromServer) {
      return pug`
        div
          button(onClick=this.openModal)#add-member.btn.btn-primary Add member
          if(this.state.modalIsOpen)
            .overlay
              .Modal()
                Link(to="?members" style={ textDecoration: 'none' })
                  button.close-btn(onClick=this.closeModal)
                    span(className="closebtn glyphicon glyphicon-remove")
                fieldset#form
                  label(for="email").full-screen Email:
                    input(type="email", name="email", value=this.state.email, onChange=this.handleTextChange)#email.form-control.input-group-lg
                  if (this.state.errors)
                    span.error #{this.state.errors.email}
                  label(for="flat").full-screen Flat:
                    input(type="text", name="flat", value=this.state.isAdmin ? '' : this.state.flat, onChange=this.handleTextChange, disabled=this.state.isAdmin)#room.form-control.input-group-lg
                  .form-group.isAdmin
                    span.custom-label 
                      strong Admin:  
                    label#female.radio-inline.gender Yes
                      input(type='radio', name='admin1', value='true', checked=this.state.isAdmin === true, onChange=this.handleOptionChange).gender
                    label#male.radio-inline.gender No
                      input(type='radio', name='admin2', value='false', checked=this.state.isAdmin === false, onChange=this.handleOptionChange).gender
                div(className='button-center')
                  button(type='submit', onClick=this.onClick)#invite.btn.btn-primary Invite
      `;
    }
    else {
      return pug`
      div
        button(onClick=this.openModal)#add-member.btn.btn-primary Add member
        .overlay
          .Modal(onRequestClose=this.closeModal)
            div(className='button-center')
              h3 #{this.state.messageFromServer}
              Link(to="?members", style={ textDecoration: 'none' })
                button(onClick=this.closeModal) Close the Dialog
      `;
    }
  }
}

Modal.setAppElement('#root');

export default withRouter(AddUser);