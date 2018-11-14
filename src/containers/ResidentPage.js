import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import MyCover from '../components/PageContents/MyCover.jsx'
import ResidentList from '../components/PageContents/ResidentList.jsx'
import Footer from '../components/Footer.jsx'

class Resident extends Component {
  render() {
    const {id} = this.props
    return pug`
      Header
      div(className="Resident")
        .container
          .timeline
            MyCover(id = id)
            ResidentList(id = id)
      Footer
    `;
  }
}

export default Resident;