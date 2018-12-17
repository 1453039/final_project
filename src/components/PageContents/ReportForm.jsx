import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class ReportForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      report: '',
      reports: []
    }
    this.getUserFromSession = this.getUserFromSession.bind(this)
    this.createReport = this.createReport.bind(this)
    this.handleReportChange = this.handleReportChange.bind(this)
    this.handleSubmitReport = this.handleSubmitReport.bind(this)
    this.getReports = this.getReports.bind(this)
  }

  componentWillMount() {
    this.getUserFromSession(this)
    this.getReports(this)
  }

  async getUserFromSession(e) {
    await axios.get("/user/get_user_from_session").then((response) => {
      e.setState({
        user: response.data
      })
    }).catch(err => {
      console.log("err", err);
    })
  }

  async getReports(e) {
    await axios.get("/report/get-list-report", {
      params: {
        apartment: e.props.match.params.id
      }
    }).then(async reponse => {
      console.log('reponse.data', reponse.data)
      let list = reponse.data
      for (var i in list)
        await axios.get("/user/get-user", {
          params: {
            id: list[i].author
          }
        }).then(rep => {
          let report = {}
          report._id = list[i]._id
          report.avatar = rep.data.avatar
          report.name = rep.data.name
          report.detail = list[i].detail
          report.date = list[i].date
          e.setState({ reports: [...e.state.reports, report] });
        }).catch(err => {
          console.log("err", err)
        })
    }).catch(err => {
      console.log('err', err);
    })
  }

  async createReport(e) {
    await axios.post("/report/insert", {
      apartment: e.props.match.params.id,
      author: e.state.user._id,
      detail: e.state.report
    }).then(response => {
      alert(response.data);
    }).catch(err => {
      console.log("err", err);
    })
  }
  
  handleReportChange(e) {
    this.setState({ report: e.target.value })
  }

  handleSubmitReport() {
    this.createReport(this)
    this.setState({ report: '' })
  }

  handleReportTime(time) {
    let reportTime = new Date(time)
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = reportTime.getDate()
    let month = reportTime.getMonth()
    return (monthNames[month] + ' ' + day)
  }

  render() {
    return pug`
      if(!this.state.user.isAdmin)
        .report-form
          h3.grey What do you want to report ?
          textarea(row='10', cols='7', placeholder='Enter text', value=this.state.report, onChange=this.handleReportChange, required)
          button.btn-primary(type='submit', onClick=this.handleSubmitReport) Send a report
      else
        .report-list
          h3.grey Report List
          .report-container
            each item in this.state.reports
              .report-item(key=item._id)
                img.profile-photo-md.pull-left(src=item.avatar, alt="user")
                .report-detail
                  .user-info
                    h5
                      Link.profile-link(to="/") #{item.name}
                      p.text-muted #{this.handleReportTime(item.date)}
                  .line-divider
                  .report-description
                    p #{item.detail}
    `;
  }
}

export default withRouter(ReportForm);