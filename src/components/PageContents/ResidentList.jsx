import React, { PureComponent } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../../../public/styles/ResidentList.scss';
import '../../../public/styles/AddUser.scss';
import Friends from './Friends.jsx';
import AddUser from './AddUser.jsx'

class ResidentList extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			user: [],
			friends: []
		}
    this.getUserFromSession = this.getUserFromSession.bind(this);
    this.getMemberList = this.getMemberList.bind(this);
    this.reloadMemberList = this.reloadMemberList.bind(this);
  }
  
	async componentDidMount() {
    await this.getUserFromSession(this);
    await this.getMemberList(this);
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

  async getMemberList(e) {
    await axios.get("/user/get-resident-of-apartment", {
      params: {
        id: e.props.match.params.id,
        userId: e.state.user._id
      }
    }).then(response => {
      e.setState({friends: response.data});
    }).catch(err => {
      console.log("err", err);
    })
  }

  reloadMemberList() {
    this.getMemberList(this)
  }

  sortByName(array) {
    return array.sort(function(a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })
  }

  sortMemberByType(array) {
    let adminArray = array.filter(item => item.isAdmin == true)
    adminArray = this.sortByName(adminArray);
    let memberArray = array.filter(item => item.isAdmin == false)
    memberArray = this.sortByName(memberArray);
    return adminArray.concat(memberArray);
  }

  render() {
		return pug`
			#page-contents
				.row
					.col-md-3
						if(this.state.user.isAdmin)
							AddUser(reloadMemberList = this.reloadMemberList)
					.col-md-9
						.friend-list
							Friends(friends=this.sortMemberByType(this.state.friends))
		`;
  }
}

export default withRouter(ResidentList);
