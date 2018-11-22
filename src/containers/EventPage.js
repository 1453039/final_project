import React, { Component } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SideBarLeft from '../components/PageContents/SideBarLeft.jsx'
import SideBarRight from '../components/PageContents/SideBarRight.jsx'
import PostCreatBox from '../components/PageContents/PostCreateBox.jsx'
import Event from '../components/PageContents/Event.jsx'

class EventPage extends Component {
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
    return pug`
      Header
      #page-contents
        .container
          .row
            SideBarLeft
            .col-md-7
              PostCreatBox
              each event in this.state.events
                Event(key=event.id, event=event)  
            SideBarRight
      Footer
    `;
  }
}

export default EventPage;