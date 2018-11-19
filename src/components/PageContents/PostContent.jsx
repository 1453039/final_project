import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class PostContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const post = this.props.post;
    const page = this.props.page;
    return pug`
			.post-content
				if (page == 'timeline')
					.post-date.hidden-xs.hidden-sm
						h5 Trần Gia Bảo Thy
						p.text-grey #{post.time}
				if post.linkImg
					img.img-responsive.post-image(src=post.linkImg, alt="post-image")
				if post.linkVideo
					video.post-video(controls)
						source(src=post.linkVideo, type="video/mp4")
				.post-container
					img.profile-photo-md.pull-left(src="http://placehold.it/300x300", alt="user")
					.post-detail
						.user-info
							h5
								Link.profile-link(to="/") #{post.user}
							p.text-muted #{post.time}
						.reaction
							Link.btn.text-green(to='/') 
								i.fa.fa-thumbs-up 
								span #{post.like}
							Link.btn.text-red(to='/') 
								i.fa.fa-thumbs-down 
								span #{post.dislike}
						.line-divider
						.post-text
							p #{post.postDetail}
						.line-divider
						each comment in post.comments
							.post-comment(key=comment.id)
								img.profile-photo-sm(src="http://placehold.it/300x300", alt="")
								Link.profile-link(to="/") #{comment.user}
								span.text-muted #{comment.time}
								p #{comment.commentDetail}
						.post-comment
							input.form-control(type="text", placeholder="Post a comment")
		`;
  }
}

export default PostContent;
