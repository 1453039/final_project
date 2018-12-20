import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import MyCover from '../components/PageContents/MyCover.jsx'
import ResidentList from '../components/PageContents/ResidentList.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class Resident extends Component {
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
        Header
        div(className="Resident")
          .container
            .timeline
              MyCover
              ResidentList
        Footer
      `;
    else return pug``;
  }
}

export default withRouter(Resident);