import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {getSocket} from '../../socket'
let socket

class ChatOnline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUsers: [],
      onlineUserIds: []
    }
    socket = getSocket();
  }
  
  async getOnlineUser(e) {

  }
    
  render() {
    return pug`
      #chat-block
        .title Chat Online
        ul.online-users.list-inline
          each item in this.state.onlineUsers
            li(key=item.id)
              Link(to="?messages", title=item.name)
                img(src=item.linkImg, alt="user").img-responsive.profile-photo
                span.online-dot
    `
  }  
}

export default ChatOnline;