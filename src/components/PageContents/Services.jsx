import React, {Component} from 'react'
import '../../../public/styles/Service.scss';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import CreatePopup from '../PageContents/CreatePopup.jsx';

class Services extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: [],
      showPopup: false,
      services: []
    }
    this.togglePopup=this.togglePopup.bind(this);
    this.reloadServices = this.reloadServices.bind(this);
    this.onClickBookNow = this.onClickBookNow.bind(this);
  }

  async componentDidMount() {
    await this.getUserFromSession(this);
    await this.getServices(this);
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

  async getServices(e) {
    await axios.get("/service/get-services", {
      params: {
        apartment: e.props.match.params.id
      }
    }).then(response => {
      let services = response.data.filter(item => item.description != '');
      e.setState({ services: services });
    }).catch(err => {
      console.log(err);
    })
  }

  async onClickBookNow(e) {
    let myThis = this
    let service = e.target.value
    await axios.get("/user/get-user", {
      params: {
        id: e.target.id
      }
    }).then(response => {
      let services = myThis.state.services
      let index = _.findIndex(services, function(item) {
        return item._id === service
      });
      myThis.props.history.push({
        search: '?messages',
        state: {toUser: response.data, message: 'Booking Service: ' + services[index].name}
      });
    })
  }

  reloadServices() {
    this.getServices(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  render() {
    return pug`
      .service-list
        if(this.state.user.isAdmin)
          button.add-service.btn-primary(onClick = this.togglePopup) +
        if (this.state.showPopup)
          CreatePopup(closePopup=this.togglePopup, reloadServices = this.reloadServices, admin=this.state.user._id)
        h3.grey.page-title Apartment Services
        .service-box
          each service in this.state.services 
            .service-item(key=service._id)
              .row
                .col-md-3
                  img.service-img(src=service.img)
                .col-md-9
                  .service-detail
                    h4.service-name #{service.name}
                    p.grey #{service.description}
                    p.service-price 
                      strong Price: #{service.fee.toLocaleString()} #{service.unit}
                    if (!this.state.user.isAdmin)
                      button(id=service.admin, value=service._id, onClick=this.onClickBookNow).btn.btn-primary.book-service Book Now
  `;
  }
}

export default withRouter(Services);