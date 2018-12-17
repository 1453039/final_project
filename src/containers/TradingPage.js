import React, { Component } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import PageContents from '../components/PageContents.jsx'

class TradingPage extends Component {
  constructor() {
    super();
  }
  render() {
    return pug`
      Header
      div(className="TradingPage")
        PageContents
      Footer
    `;
  }
}

export default TradingPage;