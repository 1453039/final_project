import React, {Component} from 'react';
import Dropdown from '../Common/Dropdown.jsx';
import { Link, withRouter } from 'react-router-dom';

class Menu extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      notification: [
        {
          id: 0,
          title: 'From Admins',
          link: 'admin-noti'
        },
        {
          id: 1,
          title: 'From Members',
          link: 'member-noti'
        },
      ],
    };
  }
  
  render () {
    return pug`
      ul.nav.navbar-nav.navbar-right.main-menu
        Dropdown(title="Home", link="?newfeeds")
        Dropdown(title="Notification", list=this.state.notification) 
        Dropdown(title="Payment", link="?payments")
        Dropdown(title="Trading", link="?tradings")
    `;
  }
}

export default withRouter(Menu);
