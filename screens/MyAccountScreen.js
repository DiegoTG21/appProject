import React, { Component } from 'react';
import { ActivityIndicator,Alert, Text, Button, View, FlatList,StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import {requestLocationPermission,getGeoInfo} from '../components/functions/MapFuncs';
import Loader from '../components/Loader';
import styles from '../styles/basic.styles.js'
import specificStyles from '../styles/specific.styles.js'


class MyAccountScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      email:'',
      myLoc:'',
      favLocs:[],
      reviews:[],
      likedReviews:[],
      isLoading: true

    }
  }
  async getUserInfo(){
  return await fetch ("http://10.0.2.2:3333/api/1.0.0/user/"+ await AsyncStorage.getItem('@userID'),
      {
        //set the type of request and and the auth. token
        method: 'GET',
        headers: { 
        'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
      })
     .then((response)=>
     {
      if (response.status == 200) {
        return response.json()
      } else if (response.status == 400) {
        throw 'Bad request.';
      } else {
        throw 'Problem getting data.' + response.status;
      }
     })
     .then(async (responseJson)=> { 
      //onsole.log("json object:   ", responseJson.reviews);
     // await AsyncStorage.setItem('@userData', {responseJson});
      this.setState({firstName:responseJson.first_name})
      this.setState({lastName:responseJson.last_name})
      this.setState({email:responseJson.email})
      this.setState({likedReviews:responseJson.liked_reviews})
      console.log(responseJson)
      return responseJson.reviews

     }).then(async (reviews)=> {
      this.setState({reviews:reviews});
     })
    .catch((error) => {
      console.error(error);
    }).finally(() => {
      this.setState({ isLoading: false });
      console.log("done loading");
    });
  }
  async logout()
  {
      return await fetch ("http://10.0.2.2:3333/api/1.0.0/user/logout",
      {
        //set the type of request and and the auth. token
        method: 'POST',
        headers: { 
        'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
      })
    .then((response)=>
    {
      if (response.status == 200) {
        Alert.alert("You loged out!");
        this.props.navigation.popToTop()
      } else {
        throw 'Problem loging out.' + response.status;
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }
  
 
  async componentDidMount(){
        await requestLocationPermission();
   this.setState({ myLoc:await getGeoInfo()});
   await this.getUserInfo();
   this.setState({isLoading:false})
  //get the user's location

     console.log("Just making sure:        ",this.state.myLoc);
  }

  render(){
    
    return (
      //show loader
      this.state.isLoading ? <Loader/> : (
      <View style={styles.page}> 
        <View style={styles.container}>
         <Text style={styles.text}>First name: {this.state.firstName}</Text> 
         <Text style={styles.text}>Last name: {this.state.lastName}</Text> 
         <Text style={styles.text}>Email: {this.state.email}</Text>
         <Text style={styles.nameText}>You are here!</Text> 
          {/* show the users location */}
         <MapView
              pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false} 
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                    latitude: this.state.myLoc.latitude, 
                    longitude: this.state.myLoc.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                  }}
                  >
                  <Marker
                   title={"Me!"}
                   pinColor={'green'} 
                   coordinate={{
                     latitude: this.state.myLoc.latitude,
                     
                     longitude:this.state.myLoc.longitude
                     }}/>
          </MapView>
         </View>
         <TouchableOpacity
            style={styles.button}
            onPress={()=> this.props.navigation.navigate('Liked Reviews',{data:this.state.likedReviews}) }
          >
            <Text style={styles.appButtonText}>See Liked Reviews</Text>
          </TouchableOpacity>
        
        {/* <View>
          <ReviewList reviews={(this.state.reviews)}/>
       
        </View>  */}
        <View>
        <TouchableOpacity
            style={styles.button}
            onPress={()=> this.logout()}
          >
            <Text style={styles.appButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View> 
      )
      );        
  }
}

export default MyAccountScreen;
