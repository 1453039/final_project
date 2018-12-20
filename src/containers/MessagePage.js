import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SideBarLeft from '../components/PageContents/SideBarLeft.jsx'
import SideBarRight from '../components/PageContents/SideBarRight.jsx'
import MessageList from '../components/PageContents/MessageList.jsx'
import MessageBarLeft from '../components/PageContents/MessageBarLeft.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class MessagePage extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }
  componentDidMount() {
    axios.get("/user/check-logged-in").then(response => {
      if (!response.data) {
        this.props.history.push('/');
      }
      else this.setState({ loggedIn: true })
    }).catch(err => console.log("err", err))
  }

  render() {
    if (this.state.loggedIn)
      return pug`
        Header
        #page-contents
          .container
            .row
              SideBarLeft
              .col-md-9
                .chat-room
                  .row
                    MessageBarLeft
                    MessageList
        Footer
      `;
    else return pug``;
  }
}

export default withRouter(MessagePage);