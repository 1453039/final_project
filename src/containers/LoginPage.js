import React, { Component } from 'react';
import Banner from '../components/Welcome/Banner.jsx';
import PassForm from '../components/Welcome/PassForm.jsx';
import '../../public/styles/Welcome.scss';

class LoginPage extends Component {
  render() {
<<<<<<< HEAD
    const {id} = this.props
    return pug`
      #welcome
        PassForm(id=id)
        Banner
=======
    return pug`
			#welcome
				LoginPage
				Banner
>>>>>>> 9d377cbf6eaaef32ad15c2329cd229288ac97470
		`;
  }
}

export default LoginPage;