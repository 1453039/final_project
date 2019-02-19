import React, { PureComponent } from 'react';
import Header from '../components/Header.jsx'
import MyCover from '../components/PageContents/MyCover.jsx'
import BasicInfo from '../components/PageContents/BasicInfo.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import FAVICON from '../../public/images/fav.png'

class BasicInfoPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      user: [],
      loggedIn: false
    }
    this.getUserFromSession = this.getUserFromSession.bind(this);
    this.reloadUser = this.reloadUser.bind(this);
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

  reloadUser() {
    this.getUserFromSession(this);
  }

  render() {
    if (this.state.loggedIn)
      return pug`
        Helmet
          title Profile
          link(rel="icon", type="image/png", href=FAVICON, sizes="16x16")
        Header
        div(className="BasicInfoPage")
          .container
            .timeline
              MyCover(user = this.state.user)
              BasicInfo(reloadUser = this.reloadUser)
        Footer
      `;
    else return pug``;
  }
}

export default withRouter(BasicInfoPage);