import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../../public/styles/Event.scss'
import axios from 'axios'
import _ from 'lodash'

class Events extends React.Component {
constructor(props) {
    super(props);
    this.state= {
      isOpen: false,
      postUser: [],
      currentUser: [],
      event: this.props.event,
      isAttending: false,
      attendentList: [
        {
          id: 0,
          name: 'Nguyen Pham Song Huy'
        },
        {
          id: 0,
          name: 'Vo Tran Chau'
        }
      ]
    }
    this.handleAttendent = this.handleAttendent.bind(this);
    this.toggleList = this.toggleList.bind (this);
  }

  async componentDidMount() {
    await this.getPostUser(this)
    await this.getUserFromSession(this)
    let currentUserId = this.state.currentUser._id
    let indexOfAttend = _.findIndex(this.state.event.like, function (id) {
      return id === currentUserId
    })
    if (indexOfAttend >= 0)
      this.setState({ isAttending: true })
  }

  async updateReaction(e) {
    await axios.put("/post/update-reaction", {
      id: e.state.event._id,
      like: e.state.event.like,
      dislike: e.state.event.dislike
    }).then((response) => {
      console.log(response.data)
    }).catch(err => {
      console.log("err", err)
    })
  }

  async handleAttendent() {
    let currentUserId = this.state.currentUser._id
    let indexOfAttend = _.findIndex(this.state.event.like, function (id) {
      return id === currentUserId
    })
    if (indexOfAttend >= 0)
      _.pull(this.state.event.like, currentUserId)
    else this.state.event.like.push(currentUserId);
    this.setState({isAttending: !this.state.isAttending})
    await this.updateReaction(this)
    await this.getPostUser(this)
  }
  
  async getPostUser(e) {
    await axios.get("/user/get-user", {
      params: {
        id: e.state.event.author
      }
    }).then(async (response) => {
      await e.setState({
        postUser: response.data
      })
    }).catch(err => {
      console.log("err", err)
    })
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        currentUser: response.data
      })
    }).catch(err => {
      console.log("err", err);
    })
  }

  handleEventTime(time) {
    let postTime = new Date(time)
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = postTime.getDate()
    let month = postTime.getMonth()
    let hour = postTime.getHours()
    let minute = ('0' + postTime.getMinutes()).slice(-2)
    return (monthNames[month] + ' ' + day + ' at ' + hour + ':' + minute)
  }

  toggleList () {
    this.setState ({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return pug`
      .post-content
        .post-container
          img.profile-photo-md.pull-left(src=this.state.postUser.avatar, alt="user")
          .post-detail
            .author-info
              h5#author-name
                Link.profile-link(to="/") #{this.state.postUser.name}
                if(this.state.postUser.isAdmin)
                  i.icon.ion-android-checkmark-circle
            .dropdown
              div.dropdown-toggle(onClick=this.toggleList) Attendent
                span.caret
                if (this.state.isOpen)
                  ul.dropdown-menu
                    each item in this.state.attendentList
                      li(key=item.id)
                        Link(to='?friends-timeline') #{item.name}
            .reaction
              if(this.state.isAttending)
                .text-green.btn.attending#attendent(onClick=this.handleAttendent)
                  i.icon.ion-checkmark
                  span#like #{this.state.event.like.length}
              else
                .text-green.btn#attendent(onClick=this.handleAttendent)
                  i.icon.ion-checkmark
                  span#like #{this.state.event.like.length}
            
            p.desc.grey #{this.state.event.description}
            img.img-responsive.event-image(src=this.state.event.linkImg, alt="event-image")
            .event-text
              h3.name.text-white #{this.state.event.eventName}
              if (this.state.event.cost > 0)
                h4.cost.grey Price: #{this.state.event.cost.toLocaleString()} VND
              else
                h4.cost.grey Price: FREE
              h4.date.grey #{this.handleEventTime(this.state.event.date)}
    `;
  }
}

export default Events;