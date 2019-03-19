import React, { Component } from 'react';
import Banner from '../components/Welcome/Banner.jsx';
import NewPassForm from '../components/Welcome/NewPassForm.jsx';
import '../../public/styles/Welcome.scss';
import _ from 'lodash';
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom';
import FAVICON from '../../public/images/fav.png'

class FirstLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apartment: []
    }
  }

  componentWillMount() {
    this.getApartment(this)
  }

  async getApartment(e) {
    await axios.get("/apartment/get-apartment", {
      params: {
        id_apartment: e.props.match.params.id
      }
    }).then((response) => {
      e.setState({
        apartment: response.data
      })
    }).catch(err => {
      console.log("err", err)
    })
  }

  render() {
    if (!_.isEmpty(this.state.apartment))
      return pug`
        #welcome(style={ backgroundImage: 'url(' + this.state.apartment.background + ')'})
          Helmet
            title Welcome to #{this.state.apartment.name}
            link(rel="icon", type="image/png", href=FAVICON, sizes="16x16")
          NewPassForm
          Banner
      `;
    else
      return pug`
        #welcome
          NewPassForm
          Banner
      `;
  }
}

export default withRouter(FirstLoginPage);