import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PayOnline from './PayOnline.jsx';
import _ from 'lodash';
import axios from 'axios';

class MemberView extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      user: [],
      bill: [],
      month: this.props.month,
      year: this.props.year,
      flat: this.props.flat,
      details: [],
      services: [],
    };
    this.getMonthOfBill = this.getMonthOfBill.bind (this);
    this.getServices = this.getServices.bind (this);
    this.handleClickPay = this.handleClickPay.bind (this);
    this.onClickPreviousMonth = this.onClickPreviousMonth.bind (this);
    this.onClickNextMonth = this.onClickNextMonth.bind (this);
  }

  async componentDidMount () {
    await this.getUserFromSession (this);
    if (this.state.month == '' && this.state.year == '') {
      let now = new Date ();
      let currentMonth = now.getMonth () + 1;
      if (currentMonth == 1) {
        await this.setState ({month: 12, year: now.getFullYear () - 1});
      } else {
        await this.setState ({
          month: currentMonth - 1,
          year: now.getFullYear (),
        });
      }
    }
    await this.getBill (this);
    if (!_.isEmpty (this.state.bill)) await this.getBillDetails (this);
    if (!_.isEmpty (this.state.details)) await this.getServices (this);
  }

  async getUserFromSession (e) {
    await axios
      .get ('/user/get_user_from_session')
      .then (response => {
        e.setState ({
          user: response.data,
        });
      })
      .catch (err => {
        console.log ('err', err);
      });
  }

  async getBill (e) {
    await axios
      .get ('/bill/get-bill', {
        params: {
          flatName: e.state.user.isAdmin ? e.state.flat : e.state.user.flat,
          month: e.state.month,
          year: e.state.year,
        },
      })
      .then (response => {
        e.setState ({bill: response.data});
      })
      .catch (err => {
        console.log ('err', err);
      });
  }

  async getBillDetails (e) {
    await axios
      .get ('/bill/get-bill-detail', {
        params: {
          bill: e.state.bill._id,
        },
      })
      .then (response => {
        e.setState ({details: response.data});
      })
      .catch (err => console.log ('err', err));
  }

  async getServices (e) {
    var services = [];
    for (var i in e.state.details)
      await axios
        .get ('/service/get-service', {
          params: {
            id: e.state.details[i].service,
          },
        })
        .then (response => {
          services = [...services, response.data];
        })
        .catch (err => console.log ('err', err));
    await e.setState ({services});
  }

  getMonthOfBill () {
    let arr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return arr[this.state.month - 1] + ' ' + this.state.year;
  }

  handleClickPay () {
    let bill = this.state.bill;
    bill.isPaid = true;
    bill.date = new Date ();
    this.setState ({bill});
    axios
      .put ('/bill/update-paid-bill', {
        bill: bill,
      })
      .then (response => {
        alert (response.data);
      })
      .catch (err => console.log ('err', err));
  }

  async onClickPreviousMonth () {
    await this.setState ({
      year: this.state.month == 1 ? this.state.year - 1 : this.state.year,
    });
    await this.setState ({
      month: this.state.month == 1 ? 12 : this.state.month - 1,
    });
    await this.getBill (this);
    if (!_.isEmpty (this.state.bill)) await this.getBillDetails (this);
    else this.setState ({details: []});
    if (!_.isEmpty (this.state.details)) await this.getServices (this);
    else this.setState ({services: []});
  }

  async onClickNextMonth () {
    await this.setState ({
      year: this.state.month == 12 ? this.state.year + 1 : this.state.year,
    });
    await this.setState ({
      month: this.state.month == 12 ? 1 : this.state.month + 1,
    });
    await this.getBill (this);
    if (!_.isEmpty (this.state.bill)) await this.getBillDetails (this);
    else this.setState ({details: []});
    if (!_.isEmpty (this.state.details)) await this.getServices (this);
    else this.setState ({services: []});
  }

  render () {
    return pug`
      .bill-detail
        if (this.state.user.isAdmin)
          button.btn-back(onClick = this.props.handleClickBack) Back
        .payment-title
            button.pre-month(onClick= this.onClickPreviousMonth) &larr;
            h3.grey Bills On #{this.getMonthOfBill()}
            button.next-month(onClick= this.onClickNextMonth) &rarr;
        if (!this.state.user.isAdmin)
          h4.grey.payment-detail Flat: #{this.state.user.flat}
        else
          h4.grey.payment-detail Flat: #{this.state.flat}
        if(this.state.user.isAdmin)
          if (this.state.bill)
            if (this.state.bill.isPaid)
              p.edit-bill.text-muted Edit Bill
            else
              p.edit-bill Edit Bill
        table.service-list
          thead
            tr
              th ID
              th Service Name
              th Fee
              th Unit
              th Amount
          if (!_.isEmpty(this.state.services))
            tbody
              each item, index in this.state.details
                tr(key=item._id)
                  td.id #{index + 1}
                  td.service-name #{this.state.services[index].name}
                  td.fee #{this.state.services[index].fee.toLocaleString()}
                  td.unit #{this.state.services[index].unit}
                  td.amount #{item.amount}
        h4.grey#total Total:
          if (!_.isEmpty(this.state.bill))
            span #{this.state.bill.total.toLocaleString()} VND
        if(!this.state.user.isAdmin && this.state.bill)
          if (!this.state.bill.isPaid)
            .payment-button
              PayOnline(handleClickPay = this.handleClickPay, email='cquyen0403@gmail.com', amount=this.state.bill.total, description='Flat ' + this.state.bill.flat + ' - ' + this.getMonthOfBill())
          else
            .payment-button
              button.paid(disabled) Paid
    `;
  }
}

export default MemberView;
