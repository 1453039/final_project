import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../../public/styles/Trading.scss'
import axios from 'axios'

class SellingItems extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      postUser: [],
      currentUser: [],
      item: this.props.item
    }
  }

  componentDidMount() {
    this.getPostUser(this)
    this.getUserFromSession(this)
  }

  getPostUser(e) {
    axios.get("/user/get-user", {
      params: {
        id: e.state.item.seller
      }
    }).then((response) => {
      e.setState({
        postUser: response.data
      })
    }).catch(err => {
      console.log("err", err)
    })
  }

  getUserFromSession(e) {
    axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        currentUser: response.data
      })
    }).catch(err => {
      console.log("err", err);
    })
  }

  render() {
    const page = window.location.search;
    return pug`
      .post-content
        .post-container
          img.profile-photo-md.pull-left(src=this.state.postUser.avatar, alt="user")
          .post-detail
            .seller-info
              h5#seller-name
                if (this.state.currentUser._id == this.state.postUser._id)
                  Link.profile-link(to="?timeline") #{this.state.postUser.name}
                else
                  Link.profile-link(to={search: "?friends-timeline", state: {user: this.state.postUser}}) #{this.state.postUser.name}
                if(this.state.item.isAdmin)
                  i.icon.ion-android-checkmark-circle
            if(page=='?tradings')
              Link.reaction(to={search: "?messages", state: {toUser: this.state.postUser, message: this.state.item.name}})
                .text-green.btn.chat-online
                  span Chat Online
            p.desc.grey #{this.state.item.description}
            img.img-responsive.sellingItem-image(src=this.state.item.linkImg, alt="sellingItem-image")
            .selling-text
              h4.price #{this.state.item.price.toLocaleString()} VND
              h4.name #{this.state.item.name}
    `;
  }
}

export default withRouter(SellingItems);