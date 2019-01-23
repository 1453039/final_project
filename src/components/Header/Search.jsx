import React, {Component} from 'react';
import axios from 'axios';

class Search extends Component {
  constructor () {
    super ();
    this.state = {
      query: '',
      results: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange (e) {
    this.setState ({ query: e.target.value });
  }

  async handleSearch(e) {
    e.preventDefault(); 
  }

  render () {
    return pug`
      form.navbar-form.navbar-right.hidden-sm(onSubmit=this.handleSearch)
        div.form-group
          i.icon.ion-android-search
          input.form-control(type="text", placeholder="Search post...", value=this.state.query, onChange=this.handleInputChange)
    `;
  }
}

export default Search;
