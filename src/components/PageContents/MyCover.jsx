import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import '../../../public/styles/ResidentList.scss';
import axios from 'axios';
import ImageLoader from './ImageLoader.jsx'

class MyCover extends PureComponent {
  constructor(props) {
    super(props);
    this.state= {
      user: this.props.user,
      page: 'info'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.user });
  }

  render() {
    const page = window.location.search;
    return pug`
    .timeline-cover
      ImageLoader(page=this.state.page, id='cover')
      .timeline-nav-bar.hidden-sm.hidden-xs
        .row
          .col-md-3
            .profile-info
              ImageLoader(page=this.state.page, id='avt')
              h3 #{this.state.user.name}
              if(!this.state.user.isAdmin)
                p.text-muted Flat: #{this.state.user.flat}
              else 
                p.text-muted 
                  strong Admin
          .col-md-9
            ul.list-inline.profile-menu
              li
                if(page=='?timeline')
                  Link.active(to="?timeline") My Timeline
                else
                  Link(to="?timeline") My Timeline
              li
                if(page=='?my-products')
                  Link.active(to="?my-products") My Products
                else
                  Link(to="?my-products") My Products
              li                
                if(page=='?info' || page=='?change-password')
                  Link.active(to="?info") My Account
                else
                  Link(to="?info") My Account
              li
                if(page=='?members')
                  Link.active(to="?members") Members
                else
                  Link(to="?members") Members
      .navbar-mobile.hidden-lg.hidden-md
        .profile-info
          ImageLoader(page=this.state.page, id='avt')
          h4 #{this.state.user.name}
          if(!this.state.user.isAdmin)
            p.text-muted Flat: #{this.state.user.flat}
          else 
            p.text-muted 
              strong Admin
        .mobile-menu
          ul.list-inline
            li
              if(page=='?timeline')
                Link.active(to="?timeline") My Timeline
              else
                Link(to="?timeline") My Timeline
            li
              if(page=='?my-products')
                Link.active(to="?my-products") My Products
              else
                Link(to="?my-products") My Products
            li
              if(page=='?info' || page=='?change-password')
                Link.active(to="?info") My Account
              else
                Link(to="?info") My Account
            li
              if(page=='?members')
                Link.active(to="?members") Members
              else
                Link(to="?members") Members
    `;
  }
}

export default MyCover;
