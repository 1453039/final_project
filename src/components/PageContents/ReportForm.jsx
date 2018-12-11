import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ReportForm extends React.Component {
  constructor() {
    super();
    this.state = {
      roll: 'admin',
      reports: [
        {
          id: 0,
          name: 'Tran Gia Bao Thy',
          linkImg: 'http://placehold.it/300x300',
          date: 'Dec 2 2018',
          description: "Elevator is dirty"
        },
        {
          id: 1,
          name: 'Tran Gia Bao Thy',
          linkImg: 'http://placehold.it/300x300',
          date: 'Dec 2 2018',
          description: "Elevator is dirty"
        },
      ]
    }
  }
  render() {
    return pug`
      if(this.state.roll == 'member')
        .report-form
          h3.grey What do you want to report ?
          textarea(row='10', cols='7', placeholder='Enter text', required)
          button.btn-primary(type='submit') Send a report
      else
        .report-list
          h3.grey Report List
          .report-container
            each item in this.state.reports
              .report-item(key=item.id)
                img.profile-photo-md.pull-left(src=item.linkImg, alt="user")
                .report-detail
                  .user-info
                    h5
                      Link.profile-link(to="/") #{item.name}
                      p.text-muted #{item.date}
                  .line-divider
                  .report-description
                    p #{item.description}
    `;
  }
}

export default ReportForm;