import React, { Component } from 'react';
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom';
import logo from '../../../public/images/logo.png';
import Menu from './Menu.jsx'
import Search from './Search.jsx'

class NavbarHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    }
    this.getLink = this.getLink.bind(this)
  }
  getLink(link){
    return  "/@"+this.state.id+"?"+link
  }
  render() {
    return pug`
      .navbar-header
        button.navbar-toggle.collapsed(type="button", data-toggle="collapse", data-target="#bs-example-navbar-collapse-1", aria-expanded="false")
          span(class="sr-only") Toggle navigation
          span.icon-bar
          span.icon-bar
          span.icon-bar
        Link.navbar-brand(to=this.getLink("newfeeds"))
          img(src=logo, alt="logo")
      Menu
      Search
    `;
  }
}

export default withRouter(NavbarHeader);