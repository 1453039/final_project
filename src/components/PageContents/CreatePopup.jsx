import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ImageLoader from './ImageLoader.jsx'

class CreatePopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      linkImg: '',
      day: '',
      time: '',
      eventName: '',
      cost: 0,
      itemName: '',
      price: 0,
      type: this.props.type,
      serviceName: '',
      unit: '',
      fee: 0,
      page: 'create-popup'    
    }
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this)
    this.handleImgChange = this.handleImgChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.onClickPublish = this.onClickPublish.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleAddService = this.handleAddService.bind(this)
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
    if (e.target.name == "event-name")
      this.setState({ eventName: e.target.value })
    if (e.target.name == "date") {
      this.setState({ day: e.target.value })
    }
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
      this.setState({ unit: e.target.value })
    if (e.target.name == "fee")
      this.setState({ fee: parseInt(e.target.value) })  
  }

  onClickPublish() {
    this.props.handlePopupSubmit(this.state.description, this.state.linkImg, new Date(this.state.day + ' ' + this.state.time), this.state.cost, this.state.itemName, this.state.price);
    this.props.closePopup()
  }

  async handleAddService(e) {
    e.preventDefault();
    let seft = this;
    await axios.post("/service/insert", {
      apartment: seft.props.match.params.id,
      name: seft.state.serviceName,
      description: '',
      fee: seft.state.fee,
      unit: seft.state.unit
    }).then(response => {
      alert(response.data);
      this.props.reloadServices();
      this.props.closePopup();
    }).catch(err => {
      console.log('err', err);
    })
  }

  getNow() {
    const now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    return (year + '-' + month + '-' + day);
  }

  handleKeyDown(e) {
    e.preventDefault();
  }

  render() {
    const page = window.location.search;
    const disabled = (this.state.type=='Event') ? (!this.state.description || !this.state.linkImg || !this.state.day || !this.state.time) 
    : ((this.state.type=='Trading') ? (!this.state.description || !this.state.linkImg || !this.state.itemName) 
    : (!this.state.description || !this.state.linkImg))
    const disabledService = !this.state.serviceName || !this.state.unit || this.state.fee <= 0 || !this.state.fee
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
                input#service-item.form-control(type='text', name='service-item', value=this.state.serviceName, onChange=this.handleInputChange, placeholder='Service Name')
              .form-group
                label(for='unit') Unit:
                input#unit.form-control(type='text', name='unit', value=this.state.unit, onChange=this.handleInputChange, placeholder='Unit')
              .form-group
                label(for='fee') Fee:
                input#fee.form-control(type='number', name='fee', value=this.state.fee, onChange=this.handleInputChange, placeholder='Fee')
            button#publish.btn.btn-primary.pull-right(onClick=this.handleAddService, disabled=disabledService) Add service
          else
            if (page == '?services')
              .add-service-form
                h3 Add service
                .form-group
                  label(for='service-item') Service:
                  input#service-item.form-control(type='text', name='service-item', onChange=this.handleInputChange, placeholder='Service Name')
                .form-group
                  label(for='service-decs') Detail:
                  input#service-decs.form-control(type='text', name='service-decs', onChange=this.handleInputChange, placeholder='Service Detail')
                .form-group
                  label(for='unit') Unit:
                  input#unit.form-control(type='text', name='unit', onChange=this.handleInputChange, placeholder='Unit')
                .form-group
                  label(for='fee') Fee:
                  input#fee.form-control(type='number', name='fee', onChange=this.handleInputChange, placeholder='Fee')
              button#publish.btn.btn-primary.pull-right(onClick=this.onClickPublish, disabled=disabled) Add service
            else
              .form-group
                img.profile-photo-md(src=this.props.avatar, alt="Your avatar")
                textarea.form-control(name="texts", cols="30", rows="1", placeholder="Write what you want", value=this.state.description, onChange=this.handleTextAreaChange)
              ImageLoader(page=this.state.page, handleImgChange=this.handleImgChange) 
              if(this.state.type=='Event')
                .form-group
                  label(for='event-name') Event:
                  input#event-name.input-event-info.form-control(type='text', name='event-name', value=this.state.eventName, onChange=this.handleInputChange, placeholder='Event Name')
                .form-group
                  label(for='celebration-day') Date:
                  input#celebration-day.input-event-info.form-control(type='date', name='date', min='2018-12-27', value=this.state.day, onKeyDown=this.handleKeyDown, onChange=this.handleInputChange)
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

export default withRouter(CreatePopup);