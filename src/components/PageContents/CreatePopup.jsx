import React, { PureComponent } from 'react';
import ImageLoader from './ImageLoader.jsx'

class CreatePopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state={
      description: '',
      linkImg: '',
      page: 'popup-create-post',
      type: this.props.type
    }
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    this.handleImgChange = this.handleImgChange.bind(this)
    this.onClickPublish = this.onClickPublish.bind(this)
  }

  handleTextAreaChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  handleImgChange(img) {
    console.log("img", img)
    this.setState({
      linkImg: img
    })
  }

  onClickPublish() {
    this.props.handlePopupSubmit(this.state.description, this.state.linkImg)
    this.setState({
      description: '',
      linkImg: ''
    })
    this.props.closePopup()
  }

  render() {
    return pug`
      .popup
        .popup-inner 
          button(onClick=this.props.closePopup)#close-popup.btn.btn-default.close-btn
            span.closebtn.glyphicon.glyphicon-remove
          .form-group
            img.profile-photo-md(src=this.props.avatar, alt="Your avatar")
            textarea.form-control(name="texts", cols="30", rows="1", placeholder="Write what you want", value=this.state.description, onChange=this.handleTextAreaChange)
          ImageLoader(page=this.state.page, handleImgChange=this.handleImgChange) 
          if(this.state.type=='Event')
            .form-group
              label(for='celebration-day') Date:
              input#celebration-day.input-event-info.form-control(type='date')
            .form-group
              label(for='cost') Cost:
              input#cost.input-event-info.form-control(type='number', min='0', placeholder='Cost')
          button#publish.btn.btn-primary.pull-right(onClick=this.onClickPublish, disabled=this.state.description && this.state.linkImg ? false : true) Publish
    `;
  }
}

export default CreatePopup;