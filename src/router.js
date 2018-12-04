import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import WelcomePage from './containers/WelcomePage';
import ROOT from "./root"
class Main extends Component {
  render() {
  return pug `
    Switch
      Route(exact path='/@:id', component=ROOT)
      Route(path='/', component=WelcomePage)
      Route(exact component=WelcomePage)
    `;
  }
}

export default Main;