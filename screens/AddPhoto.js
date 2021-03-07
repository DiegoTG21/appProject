import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid,TouchableOpacity ,Text} from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';
import ReviewList from '../components/ReviewList';
import {getUserReviews} from '../components/functions/getUserReviews';
import styles from '../basic.styles.js'


class AddPhoto extends Component{
  constructor(props){
    super(props);
    this.state={
      reviews:[],
      image:''
    }
}
//upload a picture
  
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
      this.state.image=='' ? 

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
          <Text style={styles.text}>Select the review you would like to add the photo to</Text>

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