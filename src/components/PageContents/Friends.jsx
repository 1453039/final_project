import React, { Component } from 'react';
import {withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
    this.deleteUser = this.deleteUser.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  componentWillMount() {
    this.getUserFromSession(this);
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err =>{
      console.log("err", err);
    })
  }

  confirmDelete(e) {
    if(confirm('Are you want to delete this resident?')) {
      this.deleteUser(e.target.id)
      this.props.reloadMemberList();
    }
  }

  async deleteUser(id) {
    await axios.get('/user/delete', {
      params: {
        id: id
      }
    }).then((response) => {
    }).catch(err => {
      console.log('err', err)
    })
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
                  if(this.state.user.isAdmin)
                    Link(to='?members', id=item._id, onClick=this.confirmDelete).pull-right.text-green Delete
                  Link(to={search: '?messages', state: {toUser: item}}).pull-right.text-green Inbox
                  h5 #{item.name}
                  if (!item.isAdmin)
                    p Flat: 
                      span #{item.flat}
                  else
                    p Admin
    `;
  }
}

export default withRouter(Friends);