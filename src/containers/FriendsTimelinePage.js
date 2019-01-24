import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import FriendsCover from '../components/PageContents/FriendsCover.jsx'
import MyTimeline from '../components/PageContents/MyTimeline.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class FriendsTimelinePage extends Component {
  constructor(props) {
    super(props);
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
    if(this.state.loggedIn)
      return pug`
        Header
        div(className="FriendsTimelinePage")
          .container
            .timeline
              FriendsCover(user = this.state.user)
              MyTimeline
        Footer
      `;
    else return pug``;
  }
}

export default withRouter(FriendsTimelinePage);