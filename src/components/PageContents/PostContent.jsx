import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'
import _ from 'lodash'
import Emoji from './Emoji.jsx';
import JSEMOJI from 'emoji-js';
import ContentLoader from "react-content-loader"

//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
// some more settings...
jsemoji.replace_mode = 'unified';

// Define the loader
const PostLoader = () => pug`
  ContentLoader(height=160, width=400, speed=2, primaryColor="#f3f3f3", secondaryColor="#ecebeb")
    rect(x="70" y="15" rx="4" ry="4" width="117" height="6.4")
    rect(x="70" y="35" rx="3" ry="3" width="85" height="6.4")
    rect(x="0" y="80" rx="3" ry="3" width="350" height="6.4")
    rect(x="0" y="100" rx="3" ry="3" width="380" height="6.4")
    rect(x="0", y="120", rx="3", ry="3", width="201", height="6.4") 
    circle(cx="30", cy="30", r="30")
`;

const PostWithImgLoader = () => pug`
  ContentLoader(height=475, width=590, speed=2, primaryColor="#f3f3f3", secondaryColor="#ecebeb")
    circle(cx="42.6" cy="35.59" r="24.6")
    rect(x="72" y="16.67" rx="4" ry="4" width="100" height="12.35")
    rect(x="73" y="39" rx="4" ry="4" width="50" height="8")
    rect(x="75" y="139" rx="5" ry="5" width="496" height="400")
    rect(x="490.69" y="16.91" rx="0" ry="0" width="57" height="34.84")
    rect(x="544.69" y="42.67" rx="0" ry="0" width="3" height="3")
    rect(x="426.69" y="15.67" rx="0" ry="0" width="54.9" height="33.04")
    rect(x="73.69" y="65.64" rx="0" ry="0" width="498.94" height="3.03")
    rect(x="75.69" y="83.46" rx="0" ry="0" width="497.76" height="11.2")
    rect(x="77.31" y="98.67" rx="0" ry="0" width="26.38" height="0")
    rect(x="73.69" y="107.45" rx="0" ry="0" width="499.8" height="11.22")
`;

class PostContent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      apartment: [],
      postUser: [],
      currentUser: [],
      post: this.props.post,
      page: window.location.search,
      comments: [],
      comment: '',
      like: '',
      dislike: '',
      emojiShown: false,
      loading: true
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
    await this.getApartment(this)
    this.initializeState()
    await this.getComments(this)
    this.setState({ loading: false });
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

  async getApartment (e) {
    await axios
      .get ('/apartment/get-apartment', {
        params: {
          id_apartment: e.props.match.params.id,
        },
      })
      .then (response => {
        e.setState ({
          apartment: response.data,
        });
      })
      .catch (err => {
        console.log ('err', err);
      });
  }

  async getComments(e) {
    await axios.get("/post/get-comment", {
      params: {
        post: e.state.post._id
      }
    }).then(async response1 => {
      var comments = []
      for (var i in response1.data)
        await axios.get("/user/get-user", {
          params: {
            id: response1.data[i].author
          }
        }).then(response => {
          let comment = {}
          comment._id = response1.data[i]._id
          comment.user = response.data
          comment.description = response1.data[i].description
          comment.time = response1.data[i].time
          comments = [...comments, comment];
        }).catch(err => {
          console.log("err", err)
        })
      e.setState({ comments });
      window.socket.on('updateComment', async (data, id) => {
        if (id == e.state.post._id)
          await axios.get("/user/get-user", {
            params: {
              id: data.author
            }
          }).then(response => {
            let comment = {}
            comment.user = response.data
            comment.description = data.description
            comment.time = data.time
            comments = [...comments, comment];
            e.setState({ comments });
          }).catch(err => {
            console.log("err", err)
          })
      })
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
      console.log(response.data)
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
    e.preventDefault();
    let comment = {}
    comment.author = this.state.currentUser._id
    comment.post = this.state.post._id,
    comment.description = this.state.comment
    window.socket.emit('comment', comment, e.target.id);
    this.setState({ comment: '' });
  }

  componentWillUnmount() {
    window.socket.off('comment');
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
    if (this.state.loading)
      if (this.state.post.linkImg)
        return pug`
          PostWithImgLoader
        `
      else return pug`
        PostLoader
      `
    else
      return pug`
        .post-content
          .post-container
            if(this.state.post.isAdmin) 
              img.profile-photo-md.pull-left(src=this.state.apartment.background, alt="user")
            else
              img.profile-photo-md.pull-left(src=this.state.postUser.avatar, alt="user")
            .post-detail
              .user-info
                h5
                  if(this.state.post.isAdmin)
                    strong #{this.state.apartment.name}
                    if (this.state.currentUser.isAdmin)
                      p.text-muted (Published by #{this.state.postUser.name})
                  else
                    if (this.state.currentUser._id == this.state.postUser._id)
                      Link.profile-link(to="?timeline") #{this.state.postUser.name}
                    else
                      Link.profile-link(to={search: "?friends-timeline", state: {user: this.state.postUser}}) #{this.state.postUser.name}
                    if (this.state.postUser.isAdmin)
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
              if this.state.post.linkImg
                img.img-responsive.post-image(src=this.state.post.linkImg, alt="post-image")
              if this.state.post.linkVideo
                video.post-video(controls)
                  source(src=this.state.post.linkVideo, type="video/mp4")
              each comment in this.state.comments
                .post-comment(key=comment._id)
                  img.profile-photo-sm(src=comment.user.avatar, alt="")
                  if (this.state.currentUser._id == comment.user._id)
                    Link.profile-link(to="?timeline") #{comment.user.name}
                  else
                    Link.profile-link(to={search: "?friends-timeline", state: {user: comment.user}}) #{comment.user.name}
                  if (comment.user.isAdmin)
                    i.icon.ion-android-checkmark-circle
                  span.text-mute #{this.handlePostTime(comment.time)}
                  p #{comment.description}
              .post-comment
                form.input-group(onSubmit=this.handleSendComment)
                  input.form-control(type="text", placeholder="Post a comment", value=this.state.comment, onChange=this.OnChangeComment)
                  Emoji(handleEmojiClick = this.handleEmojiClick, toogleEmojiState = this.toogleEmojiState, emojiShown= this.state.emojiShown)
                  span.input-group-btn
                    button.btn.btn-primary(id=this.state.post._id, type="submit", onClick=this.handleSendComment, disabled=!this.state.comment || !this.state.comment.replace(/\s/g, '').length) Send
      `;
  }
}

export default withRouter(PostContent);
