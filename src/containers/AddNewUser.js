import React from 'react';
import axios from 'axios';
import AddUser from '../components/AddUser';
import '../../public/styles/AddUser.scss';

class AddNewUser extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this.getData(this);
  }
  
  componentWillReceiveProps() {
    this.getData(this);
  }

  getData(e) {
    axios.get('/adduser/getAll')
      .then(function (response) {
        e.setState({ data: response.data });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    const showData = () => {
      console.log("here",this.state.data);
      return this.state.data.map((exp) => pug `
      tr
        td(className='counterCell')
        td(className='email-col') #{exp.email}
        td(className='password-col') #{exp.password}
        td(className='name-col') #{exp.name}
        td(className='birthday-col') #{exp.birthday}
        td(className='sex-col') #{exp.sex}
        td(className='room-col') #{exp.room}
        td(className='admin-col') #{exp.isAdmin}
      `);
    }
    return pug`
      div
        AddUser
        table
          thead
            tr
              th
              th(className='email-col') Description
              th(className='password-col') Password
              th(className='name-col') Name
              th(className='birthday-col') Birthday
              th(className='sex-col') Gender
              th(className='room-col') Room
              th(className='admin-col') Admin
          tbody
            showData()
    `;
  }
}

export default AddNewUser;