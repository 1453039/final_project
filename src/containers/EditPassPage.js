import React, { Component } from 'react';
import Header from '../components/Header.jsx'
import MyCover from '../components/PageContents/MyCover.jsx'
import EditPass from '../components/PageContents/EditPass.jsx'
import Footer from '../components/Footer.jsx'

class EditPassPage extends Component {
  render() {
    const {id} = this.props
    return pug`
      Header
      div(className="EditPassPage")
        .container
          .timeline
            MyCover(id = id)
            EditPass(id = id)
      Footer
    `;
  }
}

export default EditPassPage;