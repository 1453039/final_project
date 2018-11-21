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
        },
        {
          id: 2,
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
              .author-info
                h5#author-name
                  Link.profile-link(to="/") #{event.author}
                  if(event.isAdmin)
                    i.icon.ion-android-checkmark-circle
              .reaction
                .text-green.btn#attendent
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