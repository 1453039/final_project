import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../../public/styles/Event.scss'

class Events extends React.Component {
constructor(props) {
    super(props);
    this.state={
      isAttending: true
    }
    this.handleAttendent = this.handleAttendent.bind(this);
  }
  handleAttendent() {
    this.setState({isAttending: !this.state.isAttending})
  }
  render() {
    const {event} = this.props;
    return pug`
      .post-content
        .post-container
          img.profile-photo-md.pull-left(src=event.authorImg, alt="user")
          .post-detail
            .author-info
              h5#author-name
                Link.profile-link(to="/") #{event.author}
                if(event.isAdmin)
                  i.icon.ion-android-checkmark-circle
            .reaction
              if(this.state.isAttending)
                .text-green.btn.attending#attendent(onClick=this.handleAttendent)
                  i.icon.ion-checkmark
                  span#like #{event.attendent}
              else
                .text-green.btn#attendent(onClick=this.handleAttendent)
                  i.icon.ion-checkmark
                  span#like #{event.attendent}
            img.img-responsive.event-image(src=event.linkImg, alt="event-image")
            .event-text
              h3.desc.text-white #{event.description}
              h4.cost.grey Price: #{event.cost} VND
              h4.date.grey Date: #{event.date}
    `;
  }
}

export default Events;