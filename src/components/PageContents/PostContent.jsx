import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'

class PostContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      post: this.props.post,
      page: window.location.search
    }
    this.getPostUser = this.getPostUser.bind(this)
  }

  componentWillMount() {
    this.getPostUser(this)
  }

  async getPostUser(e) {
    await axios.get("/members/get-user", {
      params: {
        id : e.state.post.author
      }
    }).then(async (response) => {
      await e.setState({
        user: response.data
      })
    }).catch(err => {
      console.log("err", err)
    })
  }
  
  render() {
    return pug`
			.post-content
				if (this.state.page == '?timeline')
					.post-date.hidden-xs.hidden-sm
						h5 #{this.state.post.name}
						p.text-grey #{this.state.post.time}
				if this.state.post.linkImg
					img.img-responsive.post-image(src=this.state.post.linkImg, alt="post-image")
				if this.state.post.linkVideo
					video.post-video(controls)
						source(src=this.state.post.linkVideo, type="video/mp4")
				.post-container
					img.profile-photo-md.pull-left(src="http://placehold.it/300x300", alt="user")
					.post-detail
						.user-info
							h5
								Link.profile-link(to="/") #{this.state.post.author}
								if(this.state.post.isAdmin)
									span.text-muted
										i.icon.ion-android-checkmark-circle Admin
							p.text-muted #{this.state.post.time}
						.reaction
							.btn.text-green
								i.fa.fa-thumbs-up 
								span #{this.state.post.numLike}
							.btn.text-red
								i.fa.fa-thumbs-down 
								span #{this.state.post.numDislike}
						.line-divider
						.post-text
							p #{this.state.post.description}
						.line-divider
						each comment in this.state.post.comments
							.post-comment(key=comment.id)
								img.profile-photo-sm(src="http://placehold.it/300x300", alt="")
								Link.profile-link(to="/") #{comment.user}
								span.text-mute #{comment.time}
								p #{comment.commentDetail}
						.post-comment
							input.form-control(type="text", placeholder="Post a comment")
		`;
  }
}

export default withRouter(PostContent);
