import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../../public/styles/ResidentList.scss';
import axios from 'axios';

class FriendsCover extends PureComponent {
  constructor(props) {
    super(props);
    this.state= {
      user: this.props.user
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.location.state.user });
  }

  render() {
    const page = window.location.search;
    return pug`
    .timeline-cover
      img(src=this.state.user.cover)
      .timeline-nav-bar.hidden-sm.hidden-xs
        .row
          .col-md-3
            .profile-info
              img.profile-photo(src=this.state.user.avatar)
              h3 #{this.state.user.name}
              if(!this.state.user.isAdmin)
                p.text-muted Flat: #{this.state.user.flat}
              else 
                p.text-muted 
                  strong Admin
          .col-md-9
      .navbar-mobile.hidden-lg.hidden-md
        .profile-info
          img.profile-photo(src=this.state.user.avatar)
          h4 #{this.state.user.name}
          if(!this.state.user.isAdmin)
            p.text-muted Flat: #{this.state.user.flat}
          else 
            p.text-muted 
              strong Admin
    `;
  }
}

export default withRouter(FriendsCover);
