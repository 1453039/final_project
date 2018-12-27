import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ImageLoader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      selectedFile: '',
      isUpdated: false
    }
    this.onImageChange = this.onImageChange.bind(this);
    this.getUserFromSession = this.getUserFromSession.bind(this);
    this.updateAvatar = this.updateAvatar.bind(this)
    this.updateCover = this.updateCover.bind(this)
  }

  async componentWillMount() {
    await this.getUserFromSession(this)
    let selectedFile = ''
    if (this.props.id == 'avt')
      selectedFile = this.state.user.avatar
    if (this.props.id == 'cover')
      selectedFile = this.state.user.cover
    this.setState({ selectedFile })
  }

  componentDidUpdate() {
    let page = this.state.page
    if (this.props.id == 'avt' && this.state.isUpdated == true) {
      this.updateAvatar(this)
    }
    if (this.props.id == 'cover' && this.state.isUpdated == true) {
      this.updateCover(this)
    }
    if ((page == '?newfeeds' || page == '?events' || page == '?tradings' || page == '?timeline' || page =='?admin-noti' || page == '?member-noti') && this.state.isUpdated == true) {
      this.props.handleImgChange(this.state.selectedFile)
      this.setState({
        isUpdated: false
      })
    }
  }



  async updateAvatar(e) {
    await axios.put("/user/update-avatar", {
      id: e.state.user._id,
      avatar: e.state.selectedFile
    }).then((response) => {
      alert(response.data)
    }).catch(err => {
      console.log("err", err)
    })
  }

  async updateCover(e) {
    await axios.put("/user/update-cover", {
      id: e.state.user._id,
      cover: e.state.selectedFile
    }).then((response) => {
      alert(response.data)
    }).catch(err => {
      console.log("err", err)
    })
  }

  onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
          this.setState({selectedFile: e.target.result, isUpdated: true});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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

  
  
}

export default withRouter(ImageLoader);