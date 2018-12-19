import React, { Component } from 'react';
import EmojiPicker from 'emoji-picker-react';
import '../../../public/styles/Emoji.scss'

export default class Emoji extends Component {
  constructor(props){
    super(props)
  }

  render() {
    if (this.props.emojiShown) {
      return pug `
        span#show-emoji-yes(onClick=this.props.toogleEmojiState)
          i.icon.ion-happy-outline
        div.emoji-table
          EmojiPicker(onEmojiClick=this.props.handleEmojiClick, disableDiversityPicker)
      `;
    } else {
      return pug `
        span#show-emoji-yes(onClick=this.props.toogleEmojiState)
          i.icon.ion-happy-outline
      `;
    }
  }
}