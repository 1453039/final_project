import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import MyCover from '../components/PageContents/MyCover.jsx'
import Footer from '../components/Footer.jsx'
import MyProducts from '../components/PageContents/MyProducts.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class MyProductsPage extends Component {
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
    if(this.state.loggedIn)
      return pug`
        Header
        div(className="MyProductsPage")
          .container
            .timeline
              MyCover
              MyProducts
        Footer
      `;
    else return pug``;
  }
}

export default withRouter(MyProductsPage);