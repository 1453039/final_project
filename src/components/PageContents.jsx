import React, {PureComponent} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SideBarLeft from './PageContents/SideBarLeft.jsx';
import SideBarRight from './PageContents/SideBarRight.jsx';
import PostCreateBox from './PageContents/PostCreateBox.jsx';
import PostContent from './PageContents/PostContent.jsx';
import Event from './PageContents/Event.jsx';
import SellingItems from './PageContents/SellingItems.jsx'
import '../../public/styles/PageContents.scss';


class PageContents extends PureComponent {
  constructor (props) {
    super (props);
    this.state = {
      posts: [],
      events: [],
      items: [],
      user: [],
      page: window.location.search
    }
    this.reloadPostList = this.reloadPostList.bind(this)
  }

  async componentDidMount() {
    await this.getUserFromSession(this)
    if (this.state.page == '?newfeeds')
      this.getAllPost(this)
    if (this.state.page == '?events')
      this.getAllEvent(this)
    if (this.state.page == '?tradings' || this.state.page == '?my-products')
      await this.getAllSellingItem(this)
  }

  reloadPostList() {
    if (this.state.page == '?newfeeds')
      this.getAllPost(this)
    if (this.state.page == '?events')
      this.getAllEvent(this)
    if (this.state.page == '?tradings' || this.state.page == '?my-products')
      this.getAllSellingItem(this)
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

  async getAllPost(e) {
    await axios.get("/post/get-all", {
      params: {
        apartment: e.props.match.params.id,
        type: "Post"
      }
    }).then((response) => {
      e.setState({
        posts: response.data
      })
    }).catch(err => {
      console.log("err", err)
    })
  }

  async getAllEvent(e) {
    await axios.get("/post/get-all", {
      params: {
        apartment: e.props.match.params.id,
        type: "Event"
      }
    }).then((response) => {
      e.setState({
        events: response.data
      })
    }).catch(err => {
      console.log("err", err)
    })
  }

  async getAllSellingItem(e) {
    await axios.get("/trade/get-all", {
      params: {
        apartment: e.props.match.params.id,
        userId: e.state.user._id
      }
    }).then((response) => {
      e.setState({
        items: response.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  sortPostByDate(array) {
    let sortedArray = array.sort(function (a, b) {
      return new Date(b.time) - new Date(a.time);
    })
    return sortedArray
  }

  render () {
    return pug`
    #page-contents
      .container
        .row
          SideBarLeft
          .col-md-7
            PostCreateBox(reloadPostList = this.reloadPostList)
            if (this.state.page == '?newfeeds')
              each post in this.sortPostByDate(this.state.posts)
                PostContent(key=post._id, post=post)
            if (this.state.page == '?events')
              each event in this.sortPostByDate(this.state.events)
                Event(key=event._id, event=event)
            if (this.state.page == '?tradings' || this.state.page == '?my-products')
              each item in this.sortPostByDate(this.state.items)
                SellingItems(key=item.id, item=item)
          SideBarRight
    `;
  }
}

export default withRouter(PageContents);
