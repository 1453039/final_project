import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import ChatOnline from './ChatOnline.jsx'
import axios from 'axios';

class SideBarLeft extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      id: this.props.match.params.id
    }
    this.getUserFromSession = this.getUserFromSession.bind(this);
  }

  componentWillMount() {
    this.getUserFromSession(this);
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err =>{
      console.log("err", err);
    })
  }

  render() {
    let name = this.state.user.name? this.state.user.name : "User Name"
    let page = window.location.search
    return pug`
      .col-md-3.static
        .profile-card
          img(src=this.state.user.avatar, alt="user").profile-photo
          h5 
            Link(className="text-white", to="?info") #{name}
        ul.nav-news-feed
          li
            i.icon.ion-ios-home
            div
              if(page=='?newfeeds')
                Link.active(to="?newfeeds") My Newsfeed
              else
                Link(to="?newfeeds") My Newsfeed
          li
            i.icon.ion-ios-paper 
            div
              Link(to="?timeline") My Timeline
          li
            i.icon.ion-ios-contact 
            div
              Link(to="?info") My Account
          li
            i.icon.ion-ios-people-outline
            div
             Link(to="?members") Members
          li
            i.icon.ion-ios-chatboxes
            div
              if(page=='?messages')
                Link.active(to="?messages") Messages
              else
                Link(to='?messages') Messages
          li
            i.icon.ion-ios-body
            div
              if(page=='?events')
                Link.active(to="?events") Events
              else
                Link(to="?events") Events
          li
            i.icon.ion-ios-search-strong
            div
              if(page=='?services')
                Link.active(to="?services") Services
              else
                Link(to="?services") Services
          li            
            i.icon.ion-information-circled
            div
              if(page=='?reports')
                Link.active(to="?reports") Report
              else
                Link(to="?reports") Report
        ChatOnline
    `;
  }
}

export default withRouter(SideBarLeft);