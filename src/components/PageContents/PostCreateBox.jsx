import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import CreatePopup from './CreatePopup.jsx'
import '../../../public/styles/CreatePopup.scss'

class PostCreateBox extends React.PureComponent {
  constructor(props){
    super(props);
    this.state= {
      user: [],
      description: '',
      linkImg: '',
      linkVideo: '',
      type: '',
      showPopup: false
    };
    this.getUserFromSession = this.getUserFromSession.bind(this)
    this.togglePopup = this.togglePopup.bind(this)
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    this.createPost = this.createPost.bind(this)
    this.handleTypeOfPost = this.handleTypeOfPost.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePopupSubmit = this.handlePopupSubmit.bind(this)
  }

  componentWillMount() {
    this.getUserFromSession(this);
  }

  async getUserFromSession(e) {
    await axios.get("/members/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err =>{
      console.log("err", err);
    })
  }

  async createPost(e) {
    await axios.post("/post/insert", {
      apartment: e.state.user.apartment,
      author: e.state.user._id,
      isAdmin: e.state.user.isAdmin,
      description: e.state.description,
      linkImg: e.state.linkImg,
      linkVideo: e.state.linkVideo,
      type: e.state.type ? e.state.type : "Post"
    }).then((response) => {
      alert(response.data)
    }).catch(err => {
      console.log("err", err);
    })
  }

  handleSubmit() {
    this.createPost(this);
    this.props.reloadPostList();
    this.setState({
      description: ''
    })
  }

  async handlePopupSubmit(description, linkImg) {
    this.setState({
      description: description,
      linkImg: linkImg
    })
    await this.createPost(this);
    await this.props.reloadPostList();
    this.setState({
      description: '',
      linkImg: ''
    })  }

  handleTextAreaChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  handleTypeOfPost(e) {
    switch (e.target.id) {
      case "image-post":
        this.setState({
          type: "Post"
        })
      break;
      case "event-post":
        this.setState({
          type: "Event"
        })
      break;
      case "trading-post":
        this.setState({
          type: "Trading"
        })
      break;
      default:
        this.setState({
          type: "Post"
        })
      break;        
    }
  }

  togglePopup(e){
    if (this.state.showPopup == false) {
      this.handleTypeOfPost(e)
    }
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return pug`
      .create-post
        .row
          .col-md-7.col-sm-7
            .form-group
              img.profile-photo-md(src=this.state.user.avatar, alt="Your avatar")
              textarea.form-control(name="texts", cols="30", rows="1", placeholder="Write what you want", value=this.state.description, onChange=this.handleTextAreaChange)
          .col-md-5.col-sm-5
            .tools
              ul.publishing-tools.list-inline
                li.active
                  i.ion-compose
                li(name="image-post", onClick=this.togglePopup)#image-post
                  i.ion-images#image-post
                li(name="event-post", onClick=this.togglePopup)#event-post
                  i.ion-ios-body#event-post
                li(name="trading-post", onClick=this.togglePopup)#trading-post
                  i.ion-ios-cart#trading-post  
              button#publish.btn.btn-primary.pull-right(type='submit', onClick=this.handleSubmit, disabled = this.state.description ? false : true) Publish
        if (this.state.showPopup) 
          CreatePopup(closePopup=this.togglePopup, avatar=this.state.user.avatar, type = this.state.type, handlePopupSubmit = this.handlePopupSubmit)
    `;
  }
}

export default withRouter(PostCreateBox);