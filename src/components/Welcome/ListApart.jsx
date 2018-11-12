import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
<<<<<<< HEAD
import { withRouter} from "react-router-dom";
=======
>>>>>>> 9d377cbf6eaaef32ad15c2329cd229288ac97470

class ListApart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      listApart = this.props
    }
    this.handleClickApart = this.handleClickApart.bind(this);
  }
  handleClickApart(e){
    axios.get('/members/')
  }
  render() {
    const { listApart } = this.state;
=======
      isClick: false
    }
    // this.handleClickApart = this.handleClickApart.bind(this);
  }
  // handleClickApart() {
  //   this.setState({
  //     isClick: true,
  //   });
  // }
  render() {
    const isClick = this.state.isClick;
    const { listApart, listUsers } = this.props;
>>>>>>> 9d377cbf6eaaef32ad15c2329cd229288ac97470
    return pug`
      .list-apart.col-md-5.col-sm-5
        #wrapper
          h2.text-white Please choose your Aparment
          .line-divider
          each item in listApart
<<<<<<< HEAD
            Link(key=item._id, to='/@'+item._id, onClick=this.handleClickApart)
              button
                i.fa.fa-building
                p #{item.name}
                  if (item.isAdmin)  
                    b Admin
                  else
                    b Resident
=======
            button(key=item._id)
              i.fa.fa-building
              p #{item.name}
                b Resident
>>>>>>> 9d377cbf6eaaef32ad15c2329cd229288ac97470
		`;
  }
}

export default withRouter(ListApart);