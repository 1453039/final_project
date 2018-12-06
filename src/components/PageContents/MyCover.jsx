import React, { PureComponent } from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../../public/styles/ResidentList.scss';
import axios from 'axios';
import ImageLoader from './ImageLoader.jsx'

class MyCover extends PureComponent {
  constructor() {
    super();
    this.state={
      user:[],
      page: 'info'
    }
    this.getUserFromSession = this.getUserFromSession.bind(this);
  }

  componentWillMount() {
    this.getUserFromSession(this);
  }

  async getUserFromSession(e) {
    await axios.get("/members/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err =>{
      console.log("err", err);
    })
  }

  render() {
    return pug`
    .timeline-cover
      ImageLoader(page=this.state.page, id='cover')
      .timeline-nav-bar.hidden-sm.hidden-xs
        .row
          .col-md-3
            .profile-info
              ImageLoader(page=this.state.page, id='avt')
              h3 #{this.state.user.name}
              p.text-muted Flat: #{this.state.user.flat}
          .col-md-9
            ul.list-inline.profile-menu
              li
                Link(to="?timeline") My Timeline
              li
                Link(to="?info") My Account
              li
                Link(to="?members") Members
      .navbar-mobile.hidden-lg.hidden-md
        .profile-info
          ImageLoader(page=this.state.page, id='avt')
          h4 #{this.state.user.name}
          p.text-muted Flat: #{this.state.user.flat}
        .mobile-menu
          ul.list-inline
            li
              Link(to="?timeline") My Timeline
            li
              Link(to="?info") My Account
            li
              Link(to="?members") Members
    `;
  }
}

export default withRouter(MyCover);
