import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class SideBarRight extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      admins: [],
			info: [
        {
          id: 0,
          name: 'About us',
          link: 'https://translate.google.com/?hl=vi'
        },
        {
          id: 1,
          name: 'Contact us',
          link: 'https://translate.google.com/?hl=vi'
        },
        {
          id: 2,
          name: 'Privacy Policy',
          link: 'https://translate.google.com/?hl=vi'
        },
        {
          id: 3,
          name: 'Ads',
          link: 'https://translate.google.com/?hl=vi'
        },
        {
          id: 4,
          name: 'Terms',
          link: 'https://translate.google.com/?hl=vi'
        },
        {
          id: 5,
          name: 'Help',
          link: 'https://translate.google.com/?hl=vi'
        }
      ]
    }
  }
  async componentDidMount() {
    await this.getUserFromSession(this);
    await this.getAdmins(this);
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err => {
      console.log("err", err);
    })
  }

  async getAdmins(e) {
    await axios.get("/user/get-resident-of-apartment", {
      params: {
        id: e.props.match.params.id,
        userId: e.state.user._id
      }
    }).then(response => {
      e.setState({admins: response.data});
    }).catch(err => {
      console.log("err", err);
    })
  }

  render() {
    const {info} = this.state;
    return pug`
      .col-md-2.static
        .suggestions#sticky-sidebar
          h4.grey Chat to Admin
          each item in this.state.admins
            div(key=item._id)
              if(item.isAdmin)
                .follow-user
                  img(src=item.avatar).profile-photo-sm.pull-left
                  div
                    h5
                      Link(to='?friends-timeline') #{item.name}
                    Link(to={search: "?messages", state: {toUser: item}}, title=item.name).text-green Chat now
        .footer.hidden-sm.hidden-xs
          ul
            each item in info
              li(key=item.id) 
                Link(to=item.link) #{item.name}
          .copyright
            p Team 039-049 © 2018. All rights reserved
    `;
  }
}

export default withRouter(SideBarRight);