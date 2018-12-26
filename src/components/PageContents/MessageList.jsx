import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import '../../../public/styles/Message.scss';
import Emoji from './Emoji.jsx';
import JSEMOJI from 'emoji-js';

//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
// some more settings...
jsemoji.replace_mode = 'unified';

class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fromUser: [],
      toUser: this.props.history.location.state ? this.props.history.location.state.toUser : [],
      messages: [],
      message: this.props.history.location.state && this.props.history.location.state.itemName ? '[' + this.props.history.location.state.itemName + '] ' : '',
      emojiShown: false
    }
    this.getUserFromSession = this.getUserFromSession.bind(this)
    this.getMessages = this.getMessages.bind(this)
    this.onChangeMessage = this.onChangeMessage.bind(this)
    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.handleEmojiClick = this.handleEmojiClick.bind(this)
    this.toogleEmojiState = this.toogleEmojiState.bind(this)
  }

  async componentDidMount() {
    await this.getUserFromSession(this);
    await this.getMessages(this);
  }

  async componentWillReceiveProps(nextProps) {
    await this.setState({ toUser: nextProps.history.location.state.toUser, rerender: true });
    await this.getMessages(this)
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        fromUser: response.data
      })
    }).catch(err => {
      console.log("err", err);
    })
  }

  async getMessages(e) {
    if (!_.isEmpty(e.state.toUser))
      await axios.get("/chat/get-all-chat", {
        params: {
          from: e.state.fromUser._id,
          to: e.state.toUser._id
        }
      }).then(response => {
        var messages = response.data
        e.setState({ messages });

        window.socket.on('updateMessage', (msg) => {
          messages = [...e.state.messages, msg]
          e.setState({ messages });
        })
      }).catch(err => {
        console.log("err", err);
      })
  }

  onChangeMessage(e) {
    this.setState({ message: e.target.value })
  }

  handleSendMessage(e) {
    e.preventDefault()
    let messageInfo = {};
    messageInfo.from = this.state.fromUser._id;
    messageInfo.to = this.state.toUser._id;
    messageInfo.detail = this.state.message;
    window.socket.emit('chat', messageInfo);
    this.setState({ message: ''});
  }

  componentWillUnmount() {
    window.socket.off('chat');
  }

  handlePostTime(time) {
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

  //displays emoji inside the input window
  handleEmojiClick = (n, e) => {
    let emoji = jsemoji.replace_colons(`:${e.name}:`);
    this.setState({
      message: this.state.message + emoji,
      emojiShown: !this.state.emojiShown
    });
  }

  toogleEmojiState = () => {
    this.setState({
      emojiShown: !this.state.emojiShown
    });
  }

  handleChooseImgBtnClick = () => {
    this.setState({
      selectedImage: !this.state.selectedImage
    })
  }  
  render() {
    if (!_.isEmpty(this.state.toUser))
      return pug`
        .col-sm-7
          .scroll-wrapper.tab-content.scrollbar-wrapper.wrapper.scrollbar-outer
            .tab-content.scrollbar-wrapper.wrapper.scrollbar-outer.scroll-content.scroll-scrolly_visible
              #contact-1.tab-pane.active
                .chat-body
                  ul.chat-message
                    each message in this.state.messages
                      div(key=message._id)
                        if (message.from == this.state.toUser._id)
                          li.left
                            img(src=this.state.toUser.avatar, alt='').profile-photo-sm.pull-left
                            .chat-item
                              .chat-item-header
                                h5 #{this.state.toUser.name}
                                small.text-muted #{this.handlePostTime(message.time)}
                              p #{message.detail}
                        else if (message.from == this.state.fromUser._id)
                          li.right
                            img(src=this.state.fromUser.avatar, alt='').profile-photo-sm.pull-right
                            .chat-item
                              .chat-item-header
                                h5 #{this.state.fromUser.name}
                                small.text-muted #{this.handlePostTime(message.time)}
                              p #{message.detail}
              .send-message
                form.input-group(onSubmit=this.handleSendMessage)
                  input.form-control(type="text", placeholder="Type your message", value=this.state.message, onChange=this.onChangeMessage)
                  Emoji(handleEmojiClick = this.handleEmojiClick, toogleEmojiState = this.toogleEmojiState, emojiShown= this.state.emojiShown)
                  span.choose-img-btn
                    i.ion-images(onClick=this.handleChooseImgBtnClick)                  
                  span.input-group-btn
                    button.btn.btn-primary(type="button", onClick=this.handleSendMessage) Send
      `;
    else
      return pug`
        .col-sm-7
            .scroll-wrapper.tab-content.scrollbar-wrapper.wrapper.scrollbar-outer
              .tab-content.scrollbar-wrapper.wrapper.scrollbar-outer.scroll-content.scroll-scrolly_visible
                #contact-1.tab-pane.active
                  .chat-body
                .send-message
                  .input-group
                    input.form-control(type="text", placeholder="Type your message", disabled)
                    span.input-group-btn
                      button.btn.btn-primary(type="button", disabled) Send
      `;
  }
}

export default withRouter(MessageList);
