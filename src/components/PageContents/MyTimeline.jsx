import React, { PureComponent } from 'react';
import PostCreateBox from './PostCreateBox.jsx'
import PostContent from './PostContent.jsx'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { getSocket } from '../../socket'

class MyTimeline extends PureComponent {
  constructor (props){
    super(props);
    this.state = {
      user: [],
      posts: []
    }
    window.socket = getSocket();
    this.getUserPost = this.getUserPost.bind(this)
    this.reloadPostList = this.reloadPostList.bind(this)
    this.getUserFromSession = this.getUserFromSession.bind(this)
    this.sortPostByDate = this.sortPostByDate.bind(this)
  }

  async componentDidMount() {
    await this.getUserFromSession(this)
    await this.getUserPost(this)
  }
  
  async componentWillReceiveProps(nextProps) {
    if (nextProps.location.state) {
      await this.setState({ user: nextProps.location.state.user });
      await this.getUserPost(this);
    }
  }

  reloadPostList() {
      this.getUserPost(this)
  }
  
  async getUserPost(e) {
    await axios.get("/post/get-post-user", {
      params: {
        id: e.state.user._id,
        type: 'Post'
      }
    }).then(async (response) => {
      await e.setState({
        posts: response.data
      })
    }).catch(err => {
      console.log("err", err)
    })
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

  sortPostByDate(array) {
    let sortedArray = array.sort(function (a, b) {
      return new Date(b.time) - new Date(a.time);
    })
    return sortedArray
  }

  render() {
    let posts = this.state.posts;
    if (this.state.user.isAdmin)
      posts = posts.filter(post => post.isAdmin == false);
    return pug`
      #page-contents
        .row
          .col-md-3
          .col-md-7
            if(window.location.search == '?timeline')
              PostCreateBox(reloadPostList = this.reloadPostList)
            each post in this.sortPostByDate(posts)
              PostContent(key=post._id, post=post)
    `;
  }
}

export default withRouter(MyTimeline);