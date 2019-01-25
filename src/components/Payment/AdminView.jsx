import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash'
import axios from 'axios';

class AdminView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      month: '',
      year: ''
    }
    this.handleClickAddBill = this.props.handleClickAddBill;
    this.getMonthOfBill = this.getMonthOfBill.bind(this);
  }

  async componentDidMount() {
    let now = new Date();
    let currentMonth = now.getMonth() + 1
    if (currentMonth == 1) {
      await this.setState({ month: 12, year: now.getFullYear() - 1 })
    } else {
      await this.setState({ month: currentMonth - 1, year: now.getFullYear() });
    }
    await this.getBills(this);
  }

  async getBills(e) {
    await axios.get("/bill/get-list", {
      params: {
        apartment: e.props.match.params.id,
        month: e.state.month,
        year: e.state.year
      }
    }).then(response => {
      e.setState({ bills: response.data });
    }).catch(err => console.log("err", err));
  }
  
  getMonthOfBill() {
    let arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return arr[this.state.month - 1] + " " + this.state.year;
  }

  handlePaidDate(time) {
    let date = new Date(time)
    return date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear()
  }

  render() {
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
          h3.grey Bills On #{this.getMonthOfBill()}
          button.next-month &rarr;
        table.bill-list
          thead
            tr
              th ID
              th Flat
              th Total
              th Paid
          tbody
            each bill, index in this.state.bills
              tr(key=bill._id)
                td.id #{index + 1}
                td.flat-num 
                  Link(to={search: '?payments', state: {isAdminViewDetail: true, flat: bill.flat}}) #{bill.flat}
                td.total #{bill.total.toLocaleString()} VND
                if (bill.date)
                  td.isPaid #{this.handlePaidDate(bill.date)}
                else
                  td.isPaid
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

export default withRouter(AdminView);