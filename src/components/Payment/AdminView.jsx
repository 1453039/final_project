import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminView extends React.Component {
  constructor(props) {
    super(props);
    this.calculateBill = this.props.calculateBill;
    this.handleClickAddBill = this.props.handleClickAddBill;
  }
  render() {
    const {detail} = this.props;
    return pug`
      .bill-detail  
        button.btn.btn-primary#add-bill(onClick=this.handleClickAddBill) Add Bill
        form.tool 
          select.sort-by(name='sort-by')
            option(selected) -- Sort By --
            option(value='flat-name') Flat Name
            option(value='paid') Paid
          div.form-group
            input(type="text", placeholder="Search flat...")
        .payment-title
          button.pre-month &larr;
          h3.grey Bills On #{detail.date}
          button.next-month &rarr;
        table.bill-list
          thead
            tr
              th ID
              th Flat
              th Total
              th Paid
          tbody
            each mem in detail.list
              tr(key=mem.id)
                td.id #{mem.id + 1}
                td.flat-num 
                  Link(to='/') #{mem.flat}
                td.total #{this.calculateBill(mem.id)} VND
                td.isPaid #{mem.isPaid}
      .pagi-block
        ul.pagination
          li.page-item.disabled
            Link(to='/').page-link &larr;
          li.page-item.active
            Link(to='/').page-link 1
          li.page-item
            Link(to='/').page-link 2
          li.page-item
            Link(to='/').page-link 3
          li.page-item
            Link(to='/').page-link &rarr;

    `;
  }
}

export default AdminView;