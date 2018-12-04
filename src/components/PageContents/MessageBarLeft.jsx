import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../public/styles/Message.scss';

class MessageBarLeft extends Component {
	constructor() {
		super();
		this.state = {
			message: [
				{
					id: 0,
					name: 'Võ Trân Châu',
          linkImg: 'http://placehold.it/300x300',
          contents: [
            {
              id: 0,
              detail: 'hello',
              time: 'a minutes ago',
              status: 'seen',
              isFriend: true
            },
            {
              id: 1,
              detail: 'hi',
              time: 'a minutes ago',
              status: 'seen',
              isFriend: false
            },
            {
              id: 2,
              detail: 'goodbye',
              time: 'a minutes ago',
              status: 'seen',
              isFriend: true
            },
            {
              id: 3,
              detail: 'bye',
              time: 'a minutes ago',
              status: 'seen',
              isFriend: false
            }
          ]
				},
				{
					id: 1,
					name: 'Nguyễn Thị Kim Ngân',
          linkImg: 'http://placehold.it/300x300',
          contents: [
            {
              id: 0,
              detail: 'see you soon',
              time: 'a hour ago',
              status: 'replied'
            }
          ] 
				},
				{
					id: 2,
					name: 'Nguyễn Phạm Song Huy',
          linkImg: 'http://placehold.it/300x300',
          contents: [
            {
              id: 0,
              detail: 'okay',
              time: 'a hour ago',
              status: 'chat-alert'
            }
          ] 
        }
			]
		}
	}

  render() {
    const {message} = this.state;
    return pug`
      .col-md-5
        ul.nav.nav-tabs.contact-list.scrollbar-wrapper.scrollbar-outer
          each item in message
            li(key=item.id)
              Link(to='?info')(data-toggle='tab')
                .contact
                  img(src=item.linkImg, alt='').profile-photo-sm.pull-left
                  .msg-preview
                    h6 #{item.name}
                    p.text-muted #{item.contents[item.contents.length - 1].detail}
                    small.text-muted #{item.contents[item.contents.length - 1].time}
                    if(item.contents[item.contents.length - 1].status=='seen')
                      .seen
                        i.icon.ion-checkmark-round
                    else if(item.contents[item.contents.length - 1].status=='chat-alert')
                      .chat-alert 1
                    else
                      .replied
                        i.icon.ion-reply
    `;
  }
}

export default MessageBarLeft;
