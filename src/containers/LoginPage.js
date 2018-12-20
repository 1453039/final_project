import React, { Component } from 'react';
import Banner from '../components/Welcome/Banner.jsx';
import PassForm from '../components/Welcome/PassForm.jsx';
import '../../public/styles/Welcome.scss';
import axios from 'axios'
import {withRouter} from 'react-router-dom';

class LoginPage extends Component {
  constructor (props) {
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
        id_apartment : e.props.match.params.id
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
    return pug`
      #welcome(style={ backgroundImage: 'url(' + this.state.apartment.background + ')'})
        PassForm
        Banner
		`;
  }
}

export default withRouter(LoginPage);