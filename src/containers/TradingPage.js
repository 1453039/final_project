import React, { Component } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import SideBarLeft from '../components/PageContents/SideBarLeft.jsx'
import SideBarRight from '../components/PageContents/SideBarRight.jsx'
import PostCreatBox from '../components/PageContents/PostCreateBox.jsx'
import SellingItems from '../components/PageContents/SellingItems.jsx'

class TradingPage extends Component {
  constructor() {
    super();
    this.state={
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
    }
  }
  render() {
    return pug`
      Header
      #page-contents
        .container
          .row
            SideBarLeft
            .col-md-7
              PostCreatBox
              each item in this.state.items
                SellingItems(key=item.id, sellingItem=item)  
            SideBarRight
      Footer
    `;
  }
}

export default TradingPage;