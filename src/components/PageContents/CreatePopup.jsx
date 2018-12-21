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
      itemName: '',
      price: 0,
      type: this.props.type,
      serviceName: '',
      unit: '',
      fee: ''    }
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
    if (e.target.name == "item-name")
      this.setState({ itemName: e.target.value })
    if (e.target.name == "price")
      this.setState({ price: parseInt(e.target.value) })
    if (e.target.name == "service-item")
      this.setState({ serviceName: e.target.value })
    if (e.target.name == "unit")
      this.setState({ unit: parseInt(e.target.value) })
    if (e.target.name == "fee")
      this.setState({ fee: parseInt(e.target.value) })  }

  onClickPublish() {
    this.props.handlePopupSubmit(this.state.description, this.state.linkImg, new Date(this.state.day + ' ' + this.state.time), this.state.cost, this.state.itemName, this.state.price);
    this.props.closePopup()
  }

  render() {
    const page = window.location.search; 
    console.log(this.state)   
    const disabled = (this.state.type=='Event') ? (!this.state.description || !this.state.linkImg || !this.state.day || !this.state.time) 
    : ((this.state.type=='Trading') ? (!this.state.description || !this.state.linkImg || !this.state.itemName) 
    : (!this.state.description || !this.state.linkImg))
    return pug`
      .popup
        form.popup-inner
          button(onClick=this.props.closePopup)#close-popup.btn.btn-default.close-btn
            span.closebtn.glyphicon.glyphicon-remove
          if (page == '?payments')
            .add-service-form
              h3 Add service
              .form-group
                label(for='service-item') Service:
                input#service-item.form-control(type='text', name='service-item', onChange=this.handleInputChange, placeholder='Service Name')
              .form-group
                label(for='unit') Unit:
                input#unit.form-control(type='text', name='unit', onChange=this.handleInputChange, placeholder='Unit')
              .form-group
                label(for='fee') Fee:
                input#fee.form-control(type='text', name='fee', onChange=this.handleInputChange, placeholder='Fee')
            button#publish.btn.btn-primary.pull-right(onClick=this.onClickPublish, disabled=disabled) Add service
          else
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
                input#cost.input-event-info.form-control(type='number', name='cost', min='0', value=this.state.cost, onChange=this.handleInputChange, required)
            if(this.state.type=='Trading')
              .form-group
                label(for='item-name') Item:
                input#item-name.input-event-info.form-control(type='text', name='item-name', placeholder='Item Name', value=this.state.itemName, onChange=this.handleInputChange)
              .form-group
                label(for='price') Price:
                input#price.input-event-info.form-control(type='number', name='price', min='0', placeholder='Price', value=this.state.price, onChange=this.handleInputChange, required)
            button#publish.btn.btn-primary.pull-right(onClick=this.onClickPublish, disabled=disabled) Publish
    `;
  }
}

export default CreatePopup;