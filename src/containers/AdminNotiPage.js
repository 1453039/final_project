import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import PageContents from '../components/PageContents.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import FAVICON from '../../public/images/fav.png'

class AdminNotiPage extends Component {
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
    if (this.state.loggedIn)
      return pug`
        Helmet
          title Admin Notifications
          link(rel="icon", type="image/png", href=FAVICON, sizes="16x16")
        Header
        div(className="AdminNotiPage")
          PageContents(isAdmin=true)
        Footer
      `;
    else return pug``;
  }
}

export default withRouter(AdminNotiPage);