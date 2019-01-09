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
      user: [],
      loggedIn: false
    }
  }
  async componentDidMount() {
    await axios.get("/user/check-logged-in").then(response => {
      if (!response.data) {
        this.props.history.push('/');
      }
      else this.setState({ loggedIn: true })
    }).catch(err => console.log("err", err))
    await this.getUserFromSession(this);
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err =>{
      console.log("err", err);
    })
  }

  render() {
    if (this.state.loggedIn)
      return pug`
        Header
        div(className="Resident")
          .container
            .timeline
              MyCover(user = this.state.user)
              ResidentList
        Footer
      `;
    else return pug``;
  }
}

export default withRouter(Resident);