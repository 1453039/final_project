import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Flat from '../../../public/images/flat.png'
import _ from 'lodash'
import axios from 'axios';
import Pagination from "react-js-pagination";

class AdminView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      month: '',
      year: '',
      activePage: 1,
      itemsPerPage: 5,
      search: '',
      sort: ''
    }
    this.getMonthOfBill = this.getMonthOfBill.bind(this);
    this.onClickPreviousMonth = this.onClickPreviousMonth.bind(this);
    this.onClickNextMonth = this.onClickNextMonth.bind(this);
    this.onClickExport = this.onClickExport.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleSortMember = this.handleSortMember.bind(this);
  }

  async componentDidMount() {
    let now = new Date ();
    await this.setState ({
      month: now.getMonth () + 1,
      year: now.getFullYear (),
    });
    await this.getBills(this);
    if (_.isEmpty(this.state.bills)) {
      await this.initBills(this);
      await this.getBills(this);
    }
  }

  async initBills(e) {
    await axios.post("/bill/init-bill", {
      apartment: e.props.match.params.id,
      month: e.state.month,
      year: e.state.year
    }).then(response => {
      console.log(response.data);
    }).catch(err => console.log("err", err));
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

  async onClickExport(e) {
    let myThis = this
    await axios.put("/bill/export-bill", {
      id: e.target.id,
      export: true
    }).then(response => {
      console.log(response.data);
      myThis.getBills(myThis);
    }).catch(err => {
      console.log('err', err);
    })
  }

  async onClickPreviousMonth() {
    await this.setState({ year: this.state.month == 1 ? this.state.year - 1 : this.state.year})
    await this.setState({ month: this.state.month == 1 ? 12 : this.state.month - 1 })
    await this.getBills(this);
  }

  async onClickNextMonth() {
    await this.setState({ year: this.state.month == 12 ? this.state.year + 1 : this.state.year})
    await this.setState({ month: this.state.month == 12 ? 1 : this.state.month + 1 })
    await this.getBills(this);
  }

  displayDate(time) {
    let date = new Date(time);
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear()
    return day + '/' + month + '/' + year;
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  async handleInputSearch(e) {
    this.setState({ search: e.target.value });
    if (e.target.value == '') {
      await this.getBills(this);
    } else {
      await axios.get("/bill/search", {
        params: {
          search: e.target.value,
          id: this.props.match.params.id,
          month: this.state.month,
          year: this.state.year
        }
      }).then(response => {
        this.setState({ bills: response.data });
      }).catch(err => console.log('err', err));
    }
  }

  handleForm(e) {
    e.preventDefault();
  }

  handleSortMember(e) {
    e.preventDefault();
    this.setState({ sort: e.target.value });
    if (e.target.value == '') {
      this.getBills(this);
    }
    if (e.target.value == 'flat-name') {
      let bills = this.sortByFlat(this.state.bills);
      this.setState({ bills });
    } else if (e.target.value == 'paid') {
      let bills = this.sortByPaid(this.state.bills);
      this.setState({ bills });
    } else if (e.target.value == 'exported') {
      let bills = this.sortByExported(this.state.bills);
      this.setState({ bills });
    }
  }

  sortByFlat(array) {
    return array.sort(function(a, b) {
      if (a.flat < b.flat) { return -1; }
      if (a.flat > b.flat) { return 1; }
      return 0;
    })
  }

  sortByPaid(array) {
    return array.sort(function(a, b) {
      if ((a.isPaid == false && b.isPaid == false) || (a.isPaid == true && b.isPaid == true) || (a.isPaid == false && b.isPaid == true)) { return -1; }
      if (a.isPaid == true && b.isPaid == false) { return 1; }
      return 0;
    })
  }

  sortByExported(array) {
    return array.sort(function(a, b) {
      if ((a.isExported == false && b.isExported == false) || (a.isExported == true && b.isExported == true) || (a.isExported == false && b.isExported == true)) { return -1; }
      if (a.isExported == true && b.isExported == false) { return 1; }
      return 0;
    })
  }

  render() {
    const bills = this.state.bills.slice((this.state.activePage - 1) * this.state.itemsPerPage, this.state.activePage * this.state.itemsPerPage);
    return pug`
      .bill-detail
        form.tool 
          select.sort-by(name='sort-by', value=this.state.sort, onChange=this.handleSortMember)
            option(value="") -- Sort By --
            option(value='flat-name') Flat Name
            option(value='paid') Paid
            option(value='exported') Exported
          form.form-group(onSubmit=this.handleForm)
            input(type="text", placeholder="Search for...", value=this.state.search, onChange=this.handleInputSearch)
        .payment-title
          button.pre-month(onClick= this.onClickPreviousMonth) &larr;
          h3.grey Bills On #{this.getMonthOfBill()}
          button.next-month(onClick= this.onClickNextMonth) &rarr;
        each bill in bills
          div.product-card(key=bill._id)
            div.badge Validated
            div.product-tumb
              img(src=Flat, alt="")
            div.product-details
              h2 
                Link(to={search: '?payments', state: {isAdminViewDetail: true, flat: bill.flat, month: this.state.month, year: this.state.year}}) #{bill.flat}
              p Paid 
                if (bill.isPaid)
                  i.fa.fa-check  
                  | in #{this.displayDate(bill.date)}
                else
                  i.fa.fa-times
              p Exported 
                if (bill.isExported)
                  i.fa.fa-check
                else
                  i.fa.fa-times
              div.product-bottom-details
                div.product-price #{bill.total.toLocaleString()} VND
                div.product-links
                  if (!bill.isPaid)
                    Link(to={search: '?payments', state: {isClickAddBill: true, flat: bill.flat, month: this.state.month, year: this.state.year}})
                      i.fa.fa-cog(title="Edit Bill")
                  else
                    Link(to='', style={ pointerEvents: 'none' })
                      i.fa.fa-cog(title="Edit Bill")
                  if (!bill.isExported)
                    a
                      i.fa.fa-file-archive-o(id=bill._id ,onClick=this.onClickExport, title="Export Bill")
                  else
                    a(style={ pointerEvents: 'none' })
                      i.fa.fa-file-archive-o(id=bill._id ,onClick=this.onClickExport, title="Export Bill")
      .pagi-block
        Pagination(activePage=this.state.activePage, itemsCountPerPage=this.state.itemsPerPage, totalItemsCount=this.state.bills.length, pageRangeDisplayed=3, onChange=this.handlePageChange)
    `;
  }
}

export default withRouter(AdminView);