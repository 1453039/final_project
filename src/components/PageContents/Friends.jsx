import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Friends extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {friends} = this.props;
    return pug`
      .row
        form.tool 
          select.sort-by(name='sort-by')
            option(selected) -- Sort By --
            option(value='name') Name
            option(value='flat-name') Flat Name
          div.form-group
            input(type="text", placeholder="Search for...")
        each item in friends
          .col-md-6.col-sm-6(key=item._id)
            .friends-card
              img(src=item.cover, alt='profile-cover').img-responsive.cover
              .card-info
                img(src=item.avatar, alt="user").profile-photo-lg
                .friend-info
                  Link(to={search: '?messages', state: {toUser: item}}).pull-right.text-green Inbox
                  h5 #{item.name}
                  p Flat: 
                    span #{item.flat}
    `;
  }
}

export default Friends;