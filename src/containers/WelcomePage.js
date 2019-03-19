import React, { Component } from 'react';
import Banner from '../components/Welcome/Banner.jsx';
import LoginForm from '../components/Welcome/LoginForm.jsx';
import '../../public/styles/Welcome.scss';
import { Helmet } from 'react-helmet'
import FAVICON from '../../public/images/fav.png'

class Welcome extends Component {
  render() {
    return pug`
			#welcome
				Helmet
					title Welcome to APSocial
					link(rel="icon", type="image/png", href=FAVICON, sizes="16x16")
				LoginForm
				Banner
		`;
  }
}

export default Welcome;