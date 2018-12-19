import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'
import _ from 'lodash'
import Emoji from './Emoji.jsx';
import JSEMOJI from 'emoji-js';

//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
// some more settings...
jsemoji.replace_mode = 'unified';

class PostContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      postUser: [],
      currentUser: [],
      post: this.props.post,
      page: window.location.search,
      comments: [],
      comment: '',
      like: '',
      dislike: '',
      emojiShown: false
    }
    this.onClickReaction = this.onClickReaction.bind(this)
    this.initializeState = this.initializeState.bind(this)
    this.handleSendComment = this.handleSendComment.bind(this)
    this.OnChangeComment = this.OnChangeComment.bind(this)
    this.handleEmojiClick = this.handleEmojiClick.bind(this)
    this.toogleEmojiState = this.toogleEmojiState.bind(this)
  }

  async componentDidMount() {
    await this.getPostUser(this)
    await this.getUserFromSession(this)
    this.initializeState()
    await this.getComments(this)
  }

  initializeState() {
    let currentUserId = this.state.currentUser._id
    let indexOfLike = _.findIndex(this.state.post.like, function (id) {
      return id === currentUserId
    })
    let indexOfDislike = _.findIndex(this.state.post.dislike, function (id) {
      return id === currentUserId
    })
    if (indexOfLike >= 0)
      this.setState({ like: 'liked' })
    if (indexOfDislike >= 0)
      this.setState({ dislike: 'disliked' })
  }

  async getPostUser(e) {
    await axios.get("/user/get-user", {
      params: {
        id: e.state.post.author
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

  async getComments(e) {
    await axios.get("/post/get-comment", {
      params: {
        post: this.state.post._id
      }
    }).then(async response1 => {
      if (!_.isEmpty(response1.data)) {
        for (var i in response1.data)
          await axios.get("/user/get-user", {
            params: {
              id: response1.data[i].author
            }
          }).then(response => {
            let comment = {}
            comment._id = response1.data[i]._id
            comment.name = response.data.name
            comment.avatar = response.data.avatar
            comment.description = response1.data[i].description
            comment.time = response1.data[i].time
            e.setState({ comments: [...e.state.comments, comment] });
          }).catch(err => {
            console.log("err", err)
          })
      }
    }).catch(err => {
      console.log("err", err)
    })
  }

  async updateReaction(e) {
    await axios.put("/post/update-reaction", {
      id: e.state.post._id,
      like: e.state.post.like,
      dislike: e.state.post.dislike
    }).then((response) => {
      alert(response.data)
    }).catch(err => {
      console.log("err", err)
    })
  }

  handlePostTime(time) {
    let now = new Date()
    let postTime = new Date(time)
    var timeDiff = Math.abs(now.getTime() - postTime.getTime())
    if (timeDiff / (1000 * 3600 * 24) < 1)
      if (timeDiff / (1000 * 3600) < 1)
        if (timeDiff / (1000 * 60) < 1)
          return ('Just now')
        else return (Math.floor(timeDiff / (1000 * 60)) + ' minutes ago')
      else
        return (Math.floor(timeDiff / (1000 * 3600)) + ' hours ago')
    else {
      let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let day = postTime.getDate()
      let month = postTime.getMonth()
      let hour = postTime.getHours()
      let minute = ('0' + postTime.getMinutes()).slice(-2)
      return (monthNames[month] + ' ' + day + ' at ' + hour + ':' + minute)
    }
  }

  async onClickReaction(e) {
    let currentUserId = this.state.currentUser._id
    let indexOfLike = _.findIndex(this.state.post.like, function (id) {
      return id === currentUserId
    })
    let indexOfDislike = _.findIndex(this.state.post.dislike, function (id) {
      return id === currentUserId
    })
    if (e.target.id == 'like')
      if (indexOfLike >= 0) {
        _.pull(this.state.post.like, currentUserId)
        this.setState({ like: '' })
      } else if (indexOfDislike >= 0) {
        _.pull(this.state.post.dislike, currentUserId)
        this.state.post.like.push(currentUserId)
        this.setState({ like: 'liked', dislike: '' })
      }
      else {
        this.state.post.like.push(currentUserId)
        this.setState({ like: 'liked' })
      }
    else if (e.target.id == 'dislike')
      if (indexOfDislike >= 0) {
        _.pull(this.state.post.dislike, currentUserId)
        this.setState({ dislike: '' })
      } else if (indexOfLike >= 0) {
        _.pull(this.state.post.like, currentUserId)
        this.state.post.dislike.push(currentUserId)
        this.setState({ dislike: 'disliked', like: '' })
      }
      else {
        this.state.post.dislike.push(currentUserId)
        this.setState({ dislike: 'disliked' })
      }
    await this.updateReaction(this)
    await this.getPostUser(this)
  }

  OnChangeComment(e) {
    this.setState({ comment: e.target.value })
  }

  async createComment(e) {
    await axios.post("/post/insert-comment", {
      author: e.state.currentUser._id,
      post: e.state.post._id,
      description: e.state.comment
    }).then(response => {
      console.log(response.data);
    })
  }

  async handleSendComment(e) {
    await this.createComment(this);
    await this.getComments(this);
    this.setState({ comment: '' });
  }

  //displays emoji inside the input window
  handleEmojiClick = (n, e) => {
    let emoji = jsemoji.replace_colons(`:${e.name}:`);
    this.setState({
      comment: this.state.comment + emoji,
      emojiShown: !this.state.emojiShown
    });
  }

  toogleEmojiState = () => {
    this.setState({
      emojiShown: !this.state.emojiShown
    });
  }

  render() {
    return pug`
      .post-content
        if (this.state.page == '?timeline')
          .post-date.hidden-xs.hidden-sm
            h5 #{this.state.postUser.name}
            p.text-grey #{this.handlePostTime(this.state.post.time)}
        if this.state.post.linkImg
          img.img-responsive.post-image(src=this.state.post.linkImg, alt="post-image")
        if this.state.post.linkVideo
          video.post-video(controls)
            source(src=this.state.post.linkVideo, type="video/mp4")
        .post-container
          img.profile-photo-md.pull-left(src=this.state.postUser.avatar, alt="user")
          .post-detail
            .user-info
              h5
                Link.profile-link(to="/") #{this.state.postUser.name}
                if(this.state.post.isAdmin)
                  i.icon.ion-android-checkmark-circle
                p.text-muted #{this.handlePostTime(this.state.post.time)}
            .reaction
              .btn.text-green#like(className=this.state.like, onClick=this.onClickReaction) 
                i.fa.fa-thumbs-up#like 
                span#like #{this.state.post.like.length}
              .btn.text-red#dislike(className=this.state.dislike, onClick=this.onClickReaction) 
                i.fa.fa-thumbs-down#dislike
                span#dislike #{this.state.post.dislike.length}
            .line-divider
            .post-text
              p #{this.state.post.description}
            .line-divider
            each comment in this.state.comments
              .post-comment(key=comment._id)
                img.profile-photo-sm(src=comment.avatar, alt="")
                Link.profile-link(to="/") #{comment.name}
                span.text-mute #{this.handlePostTime(comment.time)}
                p #{comment.description}
            .post-comment
              .input-group
                input.form-control(type="text", placeholder="Post a comment", value=this.state.comment, onChange=this.OnChangeComment)
                Emoji(handleEmojiClick = this.handleEmojiClick, toogleEmojiState = this.toogleEmojiState, emojiShown= this.state.emojiShown)
                span.input-group-btn
                  button.btn.btn-primary(type="button", onClick=this.handleSendComment) Send
    `;
  }
}

export default withRouter(PostContent);
