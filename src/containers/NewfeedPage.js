import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import PageContents from '../components/PageContents.jsx'
import Footer from '../components/Footer.jsx'

class NewfeedPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {id} = this.props
    return pug`
      Header(id = id)
      div(className="newfeed")
        PageContents(id = id)
      Footer
    `;
  }
}

export default NewfeedPage;