import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import MyCover from '../components/PageContents/MyCover.jsx'
import MyTimeline from '../components/PageContents/MyTimeline.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class MyTimelinePage extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }
  componentDidMount() {
    axios.get("/user/check-logged-in").then(response => {
      if (!response.data) {
        this.props.history.push('/');
      }
      else this.setState({ loggedIn: true })
    }).catch(err => console.log("err", err))
  }

  render() {
    if(this.state.loggedIn)
      return pug`
        Header
        div(className="MyTimelinePage")
          .container
            .timeline
              MyCover
              MyTimeline
        Footer
      `;
    else return pug``;
  }
}

export default withRouter(MyTimelinePage);