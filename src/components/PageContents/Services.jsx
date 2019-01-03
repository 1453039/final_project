import React, {Component} from 'react'
import '../../../public/styles/Service.scss';
import CreatePopup from '../PageContents/CreatePopup.jsx';

export default class Services extends Component {
  constructor(){
    super();
    this.state = {
      showPopup: false,
      role: 'admin',
      services: [
        {
          id: 0,
          linkImg: 'http://placehold.it/300x300',
          name: 'Badminton yard',
          description: 'Support only badminton yard',
          price: 100000,
          unit: 'VND/h'
        },
        {
          id: 1,
          linkImg: 'http://placehold.it/300x300',
          name: 'Badminton yard',
          description: 'Support only badminton yard',
          price: 100000,
          unit: 'VND/h'
        },{
          id: 2,
          linkImg: 'http://placehold.it/300x300',
          name: 'Badminton yard',
          description: 'Support only badminton yard',
          price: 100000,
          unit: 'VND/h'
        }
      ]
    }
    this.togglePopup=this.togglePopup.bind(this);
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  render() {
    return pug`
      .service-list
        if(this.state.role=='admin')
          button.add-service.btn-primary(onClick = this.togglePopup) +
        if (this.state.showPopup)
          CreatePopup(closePopup=this.togglePopup)
        h3.grey.page-title Apartment Services
        .service-box
          each service in this.state.services 
            .service-item(key=service.id)
              .row
                .col-md-3
                  img.service-img(src=service.linkImg)
                .col-md-9
                  .service-detail
                    h4.service-name #{service.name}
                    p.grey #{service.description}
                    p.service-price 
                      strong Price: #{service.price} #{service.unit}
                    button.btn.btn-primary.book-service Book Now
  `;
  }
}