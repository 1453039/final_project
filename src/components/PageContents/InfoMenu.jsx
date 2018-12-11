import React, { Component } from 'react';
import '../../../public/styles/Info.scss';
import BasicInfoPage from '../../containers/BasicInfoPage';
import { Link, withRouter } from 'react-router-dom';

class InfoMenu extends Component {
	constructor (){
    super();
  }

  render() {
    const page=window.location.search;
    return pug`
      ul.edit-menu
        li
          i.icon.ion-ios-information-outline
          if(page=='?info')
            Link.active(to='?info') Basic Information
          else
            Link(to='?info') Basic Information
        li
          i.icon.ion-ios-settings
          Link(to='?account-setting') Account Settings
        li
          i.icon.ion-ios-cog-outline
          if(page=='?change-password')
            Link.active(to="?change-password") Change Password	
          else
            Link(to="?change-password") Change Password								
        li 
          i.icon.ion-ios-locked-outline
          Link(to='/') Log Out
		`;
  }
}

export default withRouter(InfoMenu);