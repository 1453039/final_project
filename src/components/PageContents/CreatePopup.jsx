import React, { PureComponent } from 'react';
import ImageLoader from './ImageLoader.jsx'

class CreatePopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      linkImg: '',
      day: '',
      time: '',
      cost: 0,
      page: 'popup-create-post',
      type: this.props.type
    }
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    this.handleImgChange = this.handleImgChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onClickPublish = this.onClickPublish.bind(this)
  }

  handleTextAreaChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  handleImgChange(img) {
    this.setState({
      linkImg: img
    })
  }

  handleInputChange(e) {
    if (e.target.name == "date")
      this.setState({ day: e.target.value })
    if (e.target.name == "time")
      this.setState({ time: e.target.value })
    if (e.target.name == "cost")
      this.setState({ cost: parseInt(e.target.value) })
  }

  onClickPublish() {
    this.props.handlePopupSubmit(this.state.description, this.state.linkImg, new Date(this.state.day + ' ' + this.state.time), this.state.cost)
    this.props.closePopup()
  }

  render() {
    const disabled = (this.state.type=='Event') ? (!this.state.description || !this.state.linkImg || !this.state.day || !this.state.time) : (!this.state.description || !this.state.linkImg)
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
              input#celebration-day.input-event-info.form-control(type='date', name='date', value=this.state.day, onChange=this.handleInputChange)
            .form-group
              label(for='celebration-time') Time:
              input#celebration-time.input-event-info.form-control(type='time', name='time', value=this.state.time, onChange=this.handleInputChange)
            .form-group
              label(for='cost') Cost:
              input#cost.input-event-info.form-control(type='number', name='cost', min='0', , value=this.state.cost, onChange=this.handleInputChange)
          if(this.state.type=='Trading')
            .form-group
              label(for='item-name') Item:
              input#item-name.input-event-info.form-control(type='text', placeholder='Item Name')
            .form-group
              label(for='cost') Cost:
              input#cost.input-event-info.form-control(type='number', min='0', placeholder='Cost')
            .form-group
              label(for='amount') Amount:
              input#amount.input-event-info.form-control(type='number', min='0', placeholder='Amount')
           button#publish.btn.btn-primary.pull-right(onClick=this.onClickPublish, disabled=disabled) Publish
    `;
  }
}

export default CreatePopup;