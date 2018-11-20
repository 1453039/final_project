import React, { Component } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SideBarLeft from '../components/PageContents/SideBarLeft.jsx'
import SideBarRight from '../components/PageContents/SideBarRight.jsx'
import Event from '../components/PageContents/Event.jsx'

class EventPage extends Component {
  render() {
    return pug`
      Header
      #page-contents
        .container
          .row
            SideBarLeft
            .col-md-7
              Event  
            SideBarRight
      Footer
    `;
  }
}

export default EventPage;