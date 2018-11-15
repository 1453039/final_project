import React, {Component} from 'react';
import {BrowserRouter as Router, Link, withRouter} from 'react-router-dom';
import DownArrow from '../../../public/images/down-arrow.png';

class Dropdown extends Component {
  constructor (props) {
    super (props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    };
    this.toggleListTmp = this.toggleList.bind (this);
    this.handleClickOutside = this.handleClickOutside.bind (this);
    this.getLink = this.getLink.bind(this);
  }

  getLink(link){
    return  "/@"+this.props.match.params.id+"?"+link
  }

  handleClickOutside () {
    this.setState ({
      listOpen: false,
    });
  }

  toggleList () {
    if (!this.state.listOpen) {
      document.addEventListener('click', this.handleClickOutside, true);
    } else {
      document.removeEventListener('click', this.handleClickOutside, false);
    }

    if (this.props.link)
      this.props.history.push(this.props.link)

    this.setState (prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  render () {
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return pug`
      li.dropdown
        div(className="dropdown-toggle", onClick=this.toggleListTmp) #{headerTitle}
        if listOpen
          ul(className="dropdown-menu")
            each item in list
              li(key=item.id)
                Link(to=this.getLink(item.link)) #{item.title}
        `;
  }
}

export default withRouter(Dropdown);
