import React, { Component } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import PageContents from '../components/PageContents.jsx'

class EventPage extends Component {
  constructor() {
    super();
  }
  render() {
    return pug`
      Header
      div(className="EventPage")
        PageContents
      Footer
    `;
  }
}

export default EventPage;