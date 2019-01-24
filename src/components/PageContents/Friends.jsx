import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class Friends extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      friends: [],
      search: '',
      sort: ''
    }
    this.deleteUser = this.deleteUser.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleSortMember = this.handleSortMember.bind(this);
  }

  componentWillMount() {
    this.getUserFromSession(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ friends: nextProps.friends });
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err => {
      console.log("err", err);
    })
  }

  confirmDelete(e) {
    if (confirm('Are you want to delete this resident?')) {
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

  async handleInputSearch(e) {
    this.setState({ search: e.target.value });
    if (e.target.value == '') {
      this.setState({ friends: this.props.friends });
    } else {
      await axios.get("/user/search", {
        params: {
          search: e.target.value,
          id: this.props.match.params.id
        }
      }).then(response => {
        this.setState({ friends: response.data });
      }).catch(err => console.log('err', err));
    }
  }

  handleSortMember(e) {
    e.preventDefault();
    this.setState({ sort: e.target.value });
    if (e.target.value == '') {
      this.setState({ friends: this.props.friends });
    }
    if (e.target.value == 'name') {
      let friends = this.sortByName(this.state.friends);
      this.setState({ friends });
    } else {
      let friends = this.sortByFlat(this.state.friends);
      this.setState({ friends });
    }
  }

  sortByName(array) {
    return array.sort(function(a, b) {
      let name1 = a.name.split(/[' ']+/).pop();
      let name2 = b.name.split(/[' ']+/).pop();
      if (name1 < name2) { return -1; }
      if (name1 > name2) { return 1; }
      return 0;
    })
  }

  sortByFlat(array) {
    return array.sort(function(a, b) {
      if (a.flat < b.flat) { return -1; }
      if (a.flat > b.flat) { return 1; }
      return 0;
    })
  }

  handleForm(e) {
    e.preventDefault();
  }

  render() {
    return pug`
      .row
        form.tool 
          select.sort-by(name='sort-by', value=this.state.sort, onChange=this.handleSortMember)
            option(value="") -- Sort By --
            option(value='name') Name
            option(value='flat-name') Flat Name
          form.form-group(onSubmit=this.handleForm)
            input(type="text", placeholder="Search for...", value=this.state.search, onChange=this.handleInputSearch)
        each item in this.state.friends
          .col-md-6.col-sm-6(key=item._id)
            .friends-card
              img(src=item.cover, alt='profile-cover').img-responsive.cover
              .card-info
                img(src=item.avatar, alt="user").profile-photo-lg
                .friend-info
                  if(this.state.user.isAdmin)
                    Link(to='?members', id=item._id, onClick=this.confirmDelete).pull-right.text-green Delete
                  Link(to={search: '?messages', state: {toUser: item}}).pull-right.text-green Inbox
                  Link(to='?friends-timeline') #{item.name}
                  if (!item.isAdmin)
                    p Flat: 
                      span #{item.flat}
                  else
                    p Admin
    `;
  }
}

export default withRouter(Friends);