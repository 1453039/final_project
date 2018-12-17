import React, {PureComponent} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import SideBarLeft from './PageContents/SideBarLeft.jsx';
import SideBarRight from './PageContents/SideBarRight.jsx';
import PostCreateBox from './PageContents/PostCreateBox.jsx';
import PostContent from './PageContents/PostContent.jsx';
import Event from './PageContents/Event.jsx';
import '../../public/styles/PageContents.scss';


class PageContents extends PureComponent {
  constructor (props) {
    super (props);
    this.state = {
      posts: [],
      events: [],
      items: [
        {
          id: 0,
          seller: 'aaaa',
          sellerImg: 'http://placehold.it/300x300',
          isAdmin: true,
          description: 'Clock new 100%. Contact me to get more infomation.',
          amount: 10,
          price: 100000,
          linkImg: 'http://colorfully.eu/wp-content/uploads/2012/10/the-clock-is-ticking-away-facebook-cover.jpg'
        },
        {
          id: 2,
          seller: 'aaaa',
          sellerImg: 'http://placehold.it/300x300',
          isAdmin: false,
          description: 'Clock like new 99%. Buy 1 get 1.',
          amount: 2,
          price: 50000,
          linkImg: 'http://colorfully.eu/wp-content/uploads/2012/10/the-clock-is-ticking-away-facebook-cover.jpg'
        }
      ],
      page: window.location.search
    }
    this.getAllPost = this.getAllPost.bind(this)
    this.getAllEvent = this.getAllEvent.bind(this)
    this.sortPostByDate = this.sortPostByDate.bind(this)
    this.reloadPostList = this.reloadPostList.bind(this)
  }

  componentDidMount() {
    if (this.state.page == '?newfeeds')
      this.getAllPost(this)
    if (this.state.page == '?events')
      this.getAllEvent(this)
  }

  reloadPostList() {
    if (this.state.page == '?newfeeds')
      this.getAllPost(this)
    if (this.state.page == '?events')
      this.getAllEvent(this)
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
          SideBarRight
    `;
  }
}

export default withRouter(PageContents);
