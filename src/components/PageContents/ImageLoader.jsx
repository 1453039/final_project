import React from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
 
class ImageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      selectedFile: this.props.avatar
    }
    this.onImageChange = this.onImageChange.bind(this);
  }

  componentWillMount(){
    this.setState({
      selectedFile: this.props.avatar
    })
  }

  onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
          this.setState({selectedFile: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    console.log("this.props", this.props)
    const {selectedFile} = this.state
    console.log("selectedFile", selectedFile)
    return pug`
      if(this.props.page == 'popup-create-post')
        input#file(type='file', onChange=this.onImageChange)
        label(for='file')
          .btn-choose
            i.ion-images
            span Upload file
        img.selectedFile(src=selectedFile)
      else 
        if(this.props.page == 'info')
          input#file(type='file', onChange=this.onImageChange)
          label(for='file')
            img(src=this.state.selectedFile, alt='Your Image').img-responsive.profile-photo
    `;
  }
}

export default ImageLoader;