import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import '../../../public/styles/Trading.scss'

class SellingItems extends React.Component {
constructor(props) {
    super(props);
  }
  render() {
    const {sellingItem} = this.props
    return pug`
      .post-content
        .post-container
          img.profile-photo-md.pull-left(src=sellingItem.sellerImg, alt="user")
          .post-detail
            .seller-info
              h5#seller-name
                Link.profile-link(to="/") #{sellingItem.seller}
                if(sellingItem.isAdmin)
                  i.icon.ion-android-checkmark-circle
            .reaction
              .text-green.btn.chat-online
                span Chat Online
            p.desc.grey #{sellingItem.description}
            img.img-responsive.sellingItem-image(src=sellingItem.linkImg, alt="sellingItem-image")
            .selling-text
              h4.price.grey Price: #{sellingItem.price} VND
              h4.amount.grey Amount: #{sellingItem.amount}
    `;
  }
}

export default SellingItems;