import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../../public/styles/event.scss'

class Events extends React.Component {
constructor() {
    super();
    this.state={
      events: [
        {
          id: 0,
          author: 'aaaa',
          authorImg: 'http://placehold.it/300x300',
          isAdmin: false,
          description: 'Walk on foot 5km',
          attendent: 10,
          date: '20/10/2019',
          cost: 100000,
          linkImg: 'http://colorfully.eu/wp-content/uploads/2012/10/the-clock-is-ticking-away-facebook-cover.jpg'
        }
      ],
    }
  }
  render() {
    const events = this.state.events
    return pug`
      .post-content
        each event in events
          .post-container(key=event.id)
            img.profile-photo-md.pull-left(src=event.authorImg, alt="user")
            .post-detail
              .user-info
                h4#author-name
                  Link.profile-link(to="/") #{event.author}
                  if(event.isAdmin)
                    i.icon.ion-android-checkmark-circle
              .reaction
                div.btn.text-green#like
                  i.icon.ion-checkmark
                  span#like #{event.attendent}
              .line-divider
              img.img-responsive.event-image(src=event.linkImg, alt="event-image")
              .post-text
                p.desc #{event.description}
                p.cost #{event.cost}
                p.date #{event.date}
    `;
  }
}

export default Events;