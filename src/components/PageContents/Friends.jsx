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
						option(value='flat-name') Flat Name
						option(value='ad-mem') Admin-Member
					div.form-group
						input(type="text", placeholder="Search flat...")
				each item in friends
					.col-md-6.col-sm-6(key=item.id)
						.friends-card
							img(src=item.linkCover, alt='profile-cover').img-responsive.cover
							.card-info
								img(src=item.linkImg, alt="user").profile-photo-lg
								.friend-info
									Link(to='/').pull-right.text-green Inbox
									h5 #{item.name}
										i.icon.ion-android-checkmark-circle
									p Room:
										span #{item.room}
		`;
  }
}

export default Friends;