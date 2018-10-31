import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import DownArrow from '../../images/down-arrow.png';

class Dropdown extends Component {
  constructor (props) {
    super (props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
    };
    this.toggleListTmp = this.toggleList.bind (this);
    this.handleClickOutside = this.handleClickOutside.bind (this);
  }

  handleClickOutside () {
    this.setState ({
      listOpen: false,
    });
  }

  toggleList () {
    if (!this.state.listOpen) {
      document.addEventListener ('click', this.handleClickOutside, true);
    } else {
      document.removeEventListener ('click', this.handleClickOutside, false);
    }

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
          span 
            img(src=DownArrow, alt="")
        if listOpen
          ul(className="dropdown-menu")
            each item in list
              li(key=item.id)
                Router
                  Link(to=item.title) #{item.title}
        `;
  }
}

export default Dropdown;