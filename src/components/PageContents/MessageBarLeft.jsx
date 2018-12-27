import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../../public/styles/Message.scss';
import axios from 'axios';
import _ from 'lodash';

class MessageBarLeft extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      toUser: this.props.history.location.state ? this.props.history.location.state.toUser : [],
      userIdList: [],
      userList: [],
      userChatList: []
    }
    this.getUserFromSession = this.getUserFromSession.bind(this)
    this.getUserIdList = this.getUserIdList.bind(this)
    this.getUserList = this.getUserList.bind(this)
    this.getUserChatList = this.getUserChatList.bind(this)
  }

  async componentDidMount() {
    await this.getUserFromSession(this)
    await this.getUserIdList()
    await this.getUserList(this)
    await this.getUserChatList(this)
  }

  async componentWillReceiveProps(nextProps) {
    await this.setState({ toUser: nextProps.history.location.state.toUser });
    if (!_.isEmpty(this.state.toUser)) {
      let id = this.state.toUser._id
      let index = await _.findIndex(this.state.userChatList, function (chat) {
        return chat._id === id
      })
      if (index == -1) {
        var tmp = {};
        tmp._id = this.state.toUser._id
        tmp.name = this.state.toUser.name
        tmp.avatar = this.state.toUser.avatar
        tmp.lastMessage = ''
        tmp.time = ''
        this.setState({ userChatList: [...this.state.userChatList, tmp] });
        this.setState({ userChatList: [...this.state.userChatList.reverse()] });
      }
    }
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

  async getUserIdList() {
    await axios.get("/chat/get-list-user-id", {
      params: {
        id: this.state.user._id
      }
    }).then((response) => {
      this.setState({
        userIdList: response.data
      })
    })
  }

  async getUserList(e) {
    for (var i in e.state.userIdList)
      await axios.get("/user/get-user", {
        params: {
          id: e.state.userIdList[i]
        }
      }).then((response) => {
        e.setState({ userList: [...e.state.userList, response.data] });
      }).catch(err => {
        console.log("err", err)
      })
  }

  async getUserChatList(e) {
    for (var i in e.state.userList)
      await axios.get("/chat/get-last-message", {
        params: {
          from: e.state.user._id,
          to: e.state.userList[i]._id
        }
      }).then(response => {
        var tmp = {};
        tmp._id = e.state.userList[i]._id
        tmp.name = e.state.userList[i].name
        tmp.avatar = e.state.userList[i].avatar
        tmp.lastMessage = response.data.lastMessage
        tmp.lastImg = response.data.lastImg
        tmp.time = response.data.time
        e.setState({ userChatList: [...e.state.userChatList, tmp] });
        window.socket.on('updateMessage', (msg) => {
          let index = _.findIndex(e.state.userChatList, function (chat) {
            return chat._id === e.state.toUser._id
          })
          e.state.userChatList[index].lastMessage = msg.detail
          e.state.userChatList[index].lastImg = msg.linkImg
          e.state.userChatList[index].time = msg.time
          e.setState({ userChatList: [...e.state.userChatList] });
        })
      })
  }

  handlePostTime(time) {
    if (time) {
      let now = new Date()
      let postTime = new Date(time)
      var timeDiff = Math.abs(now.getTime() - postTime.getTime())
      if (timeDiff / (1000 * 3600 * 24) < 1)
        if (timeDiff / (1000 * 3600) < 1)
          if (timeDiff / (1000 * 60) < 1)
            return ('Just now')
          else return (Math.floor(timeDiff / (1000 * 60)) + ' minutes ago')
        else
          return (Math.floor(timeDiff / (1000 * 3600)) + ' hours ago')
      else {
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let day = postTime.getDate()
        let month = postTime.getMonth()
        return (monthNames[month] + ' ' + day)
      }
    }
  }

  render() {
    if (this.state.userChatList)
      return pug`
      .col-sm-5
        .scroll-wrapper.nav.nav-tabs.contact-list.scrollbar-wrapper.scrollbar-outer
          ul.nav.nav-tabs.contact-list.scrollbar-wrapper.scrollbar-outer.scroll-content.croll-scrolly_visible
            each item in this.state.userChatList
              li(key=item._id)
                Link(to={pathname: '@' + this.props.match.params.id ,search: '?messages', state: {toUser: item}})(data-toggle='tab')
                  .contact
                    img(src=item.avatar, alt='').profile-photo-sm.pull-left
                    .msg-preview
                      h5 
                        strong #{item.name}
                      if (item.lastImg)
                        p.text-muted  
                          i.ion-images
                      else 
                        p.text-muted #{item.lastMessage}
                      small.text-muted #{this.handlePostTime(item.time)}
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

export default withRouter(MessageBarLeft);
