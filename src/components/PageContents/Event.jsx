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
      attendentList: []
    }
    this.handleAttendent = this.handleAttendent.bind(this);
    this.toggleList = this.toggleList.bind(this);
    this.disabledAttending = this.disabledAttending.bind(this);
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
    await this.getAttendentList(this)
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

  async getAttendentList(e) {
    let attendentList = []
    for (var i in e.state.event.like)
      await axios.get("/user/get-user", {
        params: {
          id: e.state.event.like[i]
        }
      }).then(response => {
        attendentList= [...attendentList, response.data ];
      }).catch(err => console.log("err", err));
    e.setState({ attendentList });
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
    await this.getAttendentList(this)
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

  disabledAttending() {
    let now = new Date()
    let date = new Date(this.state.event.date)
    if (date < now)
      return true
    else return false
  }

  render() {
    return pug`
      .post-content
        .post-container
          img.profile-photo-md.pull-left(src=this.state.postUser.avatar, alt="user")
          .post-detail
            .author-info
              h5#author-name
                if (this.state.currentUser._id == this.state.postUser._id)
                  Link.profile-link(to="?timeline") #{this.state.postUser.name}
                else
                  Link.profile-link(to={search: "?friends-timeline", state: {user: this.state.postUser}}) #{this.state.postUser.name}
                if(this.state.postUser.isAdmin)
                  i.icon.ion-android-checkmark-circle
            .dropdown
              div.dropdown-toggle(onClick=this.toggleList) Attendent
                span.caret
                if (this.state.isOpen)
                  if (!_.isEmpty(this.state.attendentList))
                    ul.dropdown-menu
                      each item in this.state.attendentList
                        li(key=item._id)
                          if (this.state.currentUser._id == item._id)
                            Link.profile-link(to="?timeline") #{item.name}
                          else
                            Link.profile-link(to={search: "?friends-timeline", state: {user: item}}) #{item.name}            
            .reaction
              if(this.state.isAttending)
                button.text-green.btn.attending#attendent(onClick=this.handleAttendent, disabled=this.disabledAttending())
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