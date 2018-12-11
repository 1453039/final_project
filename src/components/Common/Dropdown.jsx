import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import DownArrow from '../../../public/images/down-arrow.png';

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
    const{list, link} = this.props
    const{listOpen, headerTitle} = this.state
    const page = window.location.search;
    return pug`
      li.dropdown
        if (list)
          if(page=='?admin-noti' || page=='?member-noti')
            div.dropdown-toggle.active(onClick=this.toggleListTmp) #{headerTitle}
              if (listOpen)
                ul.dropdown-menu
                  each item in list
                    li(key=item.id)
                      Link(to='?' + item.link) #{item.title}
          else
            div.dropdown-toggle(onClick=this.toggleListTmp) #{headerTitle}
              if (listOpen)
                ul.dropdown-menu
                  each item in list
                    li(key=item.id)
                      Link(to='?' + item.link) #{item.title}
        else 
          if(page==link)
            Link.dropdown-toggle.active(to=link) #{headerTitle}
          else
            Link.dropdown-toggle(to=link) #{headerTitle}
    `;
  }
}

export default withRouter(Dropdown);
