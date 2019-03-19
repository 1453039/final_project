import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
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
      apartment: [],
      loading: true
    };
    this.getMonthOfBill = this.getMonthOfBill.bind (this);
    this.getServices = this.getServices.bind (this);
    this.handleClickPay = this.handleClickPay.bind (this);
    this.onClickPreviousMonth = this.onClickPreviousMonth.bind (this);
    this.onClickNextMonth = this.onClickNextMonth.bind (this);
  }

  async componentDidMount () {
    await this.getUserFromSession (this);
    await this.getApartment (this);
    if (this.state.month == '' && this.state.year == '') {
      let now = new Date ();
      await this.setState ({
        month: now.getMonth () + 1,
        year: now.getFullYear (),
      });
    }
    await this.getBill (this);
    if (!_.isEmpty (this.state.bill)) await this.getBillDetails (this);
    if (!_.isEmpty (this.state.details)) await this.getServices (this);
    await this.setState({ loading: false });
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

  async getApartment (e) {
    await axios
      .get ('/apartment/get-apartment', {
        params: {
          id_apartment: e.props.match.params.id,
        },
      })
      .then (response => {
        e.setState ({
          apartment: response.data,
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
    var address = []
    if (!_.isEmpty(this.state.apartment.address))
      address = this.state.apartment.address.split(",");
    var now = new Date()
    var day = ('0' + now.getDate()).slice(-2)
    var month = ('0' + (now.getMonth() + 1)).slice(-2)
    var year = now.getFullYear()
    return pug`
      .bill-detail
        if (!this.state.loading)
          if (this.state.user.isAdmin)
            button.btn-back(onClick = this.props.handleClickBack) Back
          .payment-title
              button.pre-month(onClick= this.onClickPreviousMonth) &larr;
              h3.grey Bills On #{this.getMonthOfBill()}
              button.next-month(onClick= this.onClickNextMonth) &rarr;
          .container
            .row
              .well.col-xs-10.col-sm-10.col-md-6
                .row
                  .col-xs-6.col-sm-6.col-md-6
                    address
                      strong #{this.state.apartment.name}
                      br
                      | #{address[0]}, #{address[1]}
                      br
                      | #{address[2]}, #{address[3]}
                  .col-xs-6.col-sm-6.col-md-6.text-right
                    h4(style={color: '#6d6e71'}) Date: #{day}/#{month}/#{now.getFullYear()}
                    h4(style={color: '#6d6e71'})
                      if (!this.state.user.isAdmin)
                        strong Flat: #{this.state.user.flat}
                      else
                        strong Flat: #{this.state.flat}
                .row
                  .text-center
                    h1 Receipt
                  span
                  table.table.table-hover
                    thead
                      tr
                        th Service Name
                        th Fee
                        th.text-center Unit
                        th.text-center Amount
                    if (!_.isEmpty(this.state.bill))
                      if (!this.state.user.isAdmin && !this.state.bill.isExported)
                        tbody
                          tr
                            td.text-center(colspan="4") Your bill isn't still exported yet!
                      else
                        if (!_.isEmpty(this.state.services))
                          tbody
                            each item, index in this.state.details
                              tr(key=item._id)
                                td.col-md-6 #{this.state.services[index].name}
                                td.col-md-2.text-center #{this.state.services[index].fee.toLocaleString()} 
                                td.col-md-2.text-center #{this.state.services[index].unit}
                                td.col-md-2.text-center #{item.amount}
                            tr
                              td &#160;
                              td.text-right
                                h4
                                  strong Total:&nbsp;
                              td.text-danger(colspan="2")
                                if (!_.isEmpty(this.state.bill))
                                  h4
                                    strong #{this.state.bill.total.toLocaleString()} VND
                  if (!_.isEmpty(this.state.bill))
                    if(!this.state.user.isAdmin && this.state.bill.isExported)
                      if (!this.state.bill.isPaid)
                        .payment-button
                          PayOnline(handleClickPay = this.handleClickPay, email='cquyen0403@gmail.com', amount=this.state.bill.total, description='Flat ' + this.state.bill.flat + ' - ' + this.getMonthOfBill())
                      else
                        .payment-button
                          button.paid(disabled) Paid
    `;
  }
}

export default withRouter(MemberView);
