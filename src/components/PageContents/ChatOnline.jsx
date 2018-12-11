import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { getSocket } from '../../socket'
window.socket

class ChatOnline extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      onlineUsers: []
    }
    window.socket = getSocket();
    
    this.getOnlineUser = this.getOnlineUser.bind(this)
    this.getUserFromSession = this.getUserFromSession.bind(this)
  }

  async componentDidMount() {
    await this.getUserFromSession(this)
    await this.getOnlineUser();
    window.socket.on('OnlineUserChange', () => {
      this.getOnlineUser();
    });
  }

  async getOnlineUser() {
    await axios.get('/getOnlineUsers', {
      params: {
        apartmentId: this.props.match.params.id,
        userId: this.state.user._id
      }
    }).then((response) => {
      this.setState({ onlineUsers: response.data })
    }).catch(err => {
      console.log('err', err)
    })
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

  render() {
    return pug`
      #chat-block
        .title Chat Online
        ul.online-users.list-inline
          each item in this.state.onlineUsers
            li(key=item.user._id)
              Link(to={search: "?messages", state: {toUser: item.user}}, title=item.user.name)
                img(src=item.user.avatar, alt="user").img-responsive.profile-photo
                span.online-dot
    `
  }
}

export default withRouter(ChatOnline);