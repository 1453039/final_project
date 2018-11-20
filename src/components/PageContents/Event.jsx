import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Events extends React.Component {
constructor() {
    super();
    this.state={
      author: 'aaaa',
      description: 'Work by foot 5km',
      attendent: 10,
      date: '20/10/2019',
      linkImg: ''
    }
  }
  render() {
    return pug`
      .event-list
        
    `;
  }
}

export default Events;