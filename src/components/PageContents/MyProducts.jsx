import React, { PureComponent } from 'react';
import PostCreateBox from './PostCreateBox.jsx'
import SellingItems from './SellingItems.jsx'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class MyProducts extends PureComponent {
  constructor (props){
    super(props);
    this.state = {
      user: [],
      items: []
    }
    this.getUserPost = this.getUserPost.bind(this)
    this.reloadPostList = this.reloadPostList.bind(this)
    this.getUserFromSession = this.getUserFromSession.bind(this)
    this.sortPostByDate = this.sortPostByDate.bind(this)
  }

  async componentDidMount() {
    await this.getUserFromSession(this)
    await this.getUserPost(this)
  }

  reloadPostList() {
      this.getUserPost(this)
  }
  
  async getUserPost(e) {
    await axios.get("/trade/get-my-item", {
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
    return pug`
      #page-contents
        .row
          .col-md-3
          .col-md-7
            PostCreateBox(reloadPostList = this.reloadPostList)
            each item in this.sortPostByDate(this.state.items)
              SellingItems(key=item._id, item=item)
    `;
  }
}

export default withRouter(MyProducts);