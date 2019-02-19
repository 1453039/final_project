import React, { Component } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import PageContents from '../components/PageContents.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import FAVICON from '../../public/images/fav.png'

class EventPage extends Component {
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
        Helmet
          title Events
          link(rel="icon", type="image/png", href=FAVICON, sizes="16x16")
        Header
        div(className="EventPage")
          PageContents
        Footer
      `;
    else return pug``;
  }
}

export default withRouter(EventPage);