import React, { Component } from 'react';
import { View, Button, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';


class AddPhoto extends Component{

     sendToServer = async(picture) => {
    console.log('Location of pic is: ',picture.uri);
    let locationID=5;
    let reviewID=13;

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+await AsyncStorage.getItem('@locID')+"/review/"+await AsyncStorage.getItem('@reviewID')+"/photo",
    {
      method: 'POST',
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": await AsyncStorage.getItem('@sessionToken')
      },
      body: picture
    })
    .then((response) => {
    if (response.status===201)
    {
        ToastAndroid.show("Uploaded!",ToastAndroid.SHORT);
    }
    else{
      console.log("Status" ,response.status)
        ToastAndroid.show('Invalid',ToastAndroid.SHORT);

    }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  takePicture = async() => {
    if(this.camera){
      const options = {quality: 0.5, base64: true};
      const picture = await this.camera.takePictureAsync(options);

      this.sendToServer(picture); 
    }
  }


  render(){
    const nav = this.props.navigation;

    return (
      <View style={{flex:1}}>
        <RNCamera
          captureAudio={false}
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex:1,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        />
        <Button title="Take Photo" onPress={() => this.takePicture()} />
      </View>
    );
  }

}

export default AddPhoto;