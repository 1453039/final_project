import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import '../../../public/styles/Message.scss';
import axios from 'axios';

class MessageBarLeft extends PureComponent {
	constructor() {
		super();
		this.state = {
      user: [],
      userChatList: []
    }
    this.getUserFromSession = this.getUserFromSession.bind(this)
    this.getUserChatList = this.getUserChatList.bind(this)
  }

  async componentDidMount() {
    await this.getUserFromSession(this)
    await this.getUserChatList()
  }
  
  async getUserFromSession(e) {
    await axios.get("/members/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err => {
      console.log("err", err);
    })
  }

  async getUserChatList() {
    console.log(1);
    await axios.get("/chat/get-list-chat-people", {
      params: {
        id: this.state.user._id
      }
    }).then((response) => {
      this.setState({
        userChatList: response.data
      })
    }) 
  }

  render() {
    if(this.state.userChatList)
      return pug`
        .col-md-5
          ul.nav.nav-tabs.contact-list.scrollbar-wrapper.scrollbar-outer
            each item in this.state.userChatList
              li(key=item.userId)
                Link(to='?info')(data-toggle='tab')
                  .contact
                    img(src=item.avatar, alt='').profile-photo-sm.pull-left
                    .msg-preview
                      h6 #{item.name}
                      p.text-muted #{item.lastMessage}
                      small.text-muted #{item.time}
                      // if(item.contents[item.contents.length - 1].status=='seen')
                      //   .seen
                      //     i.icon.ion-checkmark-round
                      // else if(item.contents[item.contents.length - 1].status=='chat-alert')
                      //   .chat-alert 1
                      // else
                      //   .replied
                      //     i.icon.ion-reply
      `;
    else 
      return pug`
        .col-md-5
          ul.nav.nav-tabs.contact-list.scrollbar-wrapper.scrollbar-outer
      `;
  }
}

export default MessageBarLeft;
