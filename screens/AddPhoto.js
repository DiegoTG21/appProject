import React, { Component } from 'react';
import { View,TouchableOpacity ,Text,PermissionsAndroid} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ReviewList from '../components/ReviewList';
import {getUserReviews} from '../components/functions/getUserReviews';
import styles from '../styles/basic.styles.js'


class AddPhoto extends Component{
  constructor(props){
    super(props);
    this.state={
      reviews:[],
      image:''
    }
}
//ask for permission
 async requestCameraPermission() {
  try {
      console.log('asking/checking for permission');
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message:
          'This app requires to access your camera.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access the camera');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

//take a picture
  
  takePicture = async() => {
    if(this.camera){
      const options = {quality: 0.5, base64: true};
      const picture = await this.camera.takePictureAsync(options);

      this.setState({image:picture}); 
    }
  }
  async componentDidMount(){
    //get reviews so the user can choose
    this.setState({reviews:await getUserReviews()});

    this.setState({ isLoading: false });
}

  render(){

    return (
      this.state.image=='' && this.requestCameraPermission()? 

      <View style={{flex:15}}>
        <RNCamera
          captureAudio={false}
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex:15,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={()=>  this.takePicture()}
          >
            <Text style={styles.appButtonText}>Take Photo</Text>
          </TouchableOpacity>
        {/* <Button title="Take Photo" onPress={() => this.takePicture()} /> */}
      </View>
         : (
        <View>
          <Text style={styles.text}>What review is this photo for?</Text>

          <ReviewList reviews={(this.state.reviews) } 
          selectIndicator={true}//meaning that the user is going to select something
          image={this.state.image}
          actionOnSelect={"addPicture"}
          // picUploadedIndicator={this.state.picUploadedIndicator}
          />
        </View>
      )
    );
  }

}
export default AddPhoto;