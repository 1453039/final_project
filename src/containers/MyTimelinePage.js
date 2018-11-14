import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import MyCover from '../components/PageContents/MyCover.jsx'
import MyTimeline from '../components/PageContents/MyTimeline.jsx'
import Footer from '../components/Footer.jsx'

class MyTimelinePage extends Component {
  render() {
    const {id} = this.props
    return pug`
      Header
      div(className="MyTimelinePage")
        .container
          .timeline
            MyCover(id = id)
            MyTimeline(id = id)
      Footer
    `;
  }
}

export default MyTimelinePage;