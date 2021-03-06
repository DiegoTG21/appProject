import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid,TouchableOpacity ,Text} from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';
import ReviewList from '../components/ReviewList';
import {getUserReviews} from '../components/functions/getUserReviews';


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
            <Text>Take Photo</Text>
          </TouchableOpacity>
        {/* <Button title="Take Photo" onPress={() => this.takePicture()} /> */}
      </View>
         : (
        <ReviewList reviews={(this.state.reviews) } 
        selectIndicator={true}//meaning that the user is going to select something
        image={this.state.image}
        actionOnSelect={"addPicture"}
        // picUploadedIndicator={this.state.picUploadedIndicator}
        />
      )
    );
  }

}
const styles = StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: "center",
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderWidth: 2,
      borderColor: '#000000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      height:200,
      margin: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      flex:1,
      borderRadius: 10,
      borderColor:'black',
      fontSize:30,
      //align Vertically center
      justifyContent: 'center',
      // align horizontally center
      alignItems: 'center',
      backgroundColor: "magenta",
      marginVertical: 10,
      marginHorizontal: 10,
      padding: 10

    }
     });
export default AddPhoto;