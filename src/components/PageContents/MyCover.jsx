import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../../../public/styles/ResidentList.scss';
import ImageLoader from './ImageLoader.jsx'

class ResidentList extends Component {
  constructor() {
    super();
    this.state={
      name: 'Trần Gia Bảo Thy',
      imgLink: 'http://placehold.it/300x300',
      flat: 'A19.08',
      page: 'info'
    }
	this.getLink=this.getLink.bind(this);
  }
  getLink(link){
    return  "/@"+this.props.match.params.id+"?"+link
  }
  render() {
    const {id} = this.props.match.params.id    
    return pug`
      .timeline-cover
        .timeline-nav-bar.hidden-sm.hidden-xs
          .row
            .col-md-3
              .profile-info
                ImageLoader(page=this.state.page)
                h3 #{this.state.name}
                p.text-muted Flat: #{this.state.flat}
            .col-md-9
              ul.list-inline.profile-menu
                li
                  Link(to=this.getLink("timeline")) My Timeline
                li
                  Link(to=this.getLink("info")) About
                li
                  Link(to=this.getLink("members")) Friends
        .navbar-mobile.hidden-lg.hidden-md
          .profile-info
            ImageLoader(page=this.state.page)
            h4 #{this.state.name}
            p.text-muted Flat: + #{this.state.flat}
          .mobile-menu
            ul.list-inline
              li
                Link(to=this.getLink("timeline")) My Timeline
              li
                Link(to=this.getLink("info")) About
              li
                Link(to='/members') Members
    `;
  }
}

export default withRouter(ResidentList);
