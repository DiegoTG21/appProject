import React, { Component } from 'react';
import { TextInput, Text, View, FlatList,TouchableOpacity, StyleSheet,ToastAndroid } from 'react-native';
// import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
// import {requestLocationPermission,getCoordinates} from '../components/LocPermissions';
// import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
 import {requestLocationPermission,getGeoInfo,calculatePreciseDistance} from '../components/functions/MapFuncs';
 import Loader from '../components/Loader';
 import styles from '../styles/basic.styles.js'


 //import {t,getLan}from '../locales/getLan';
 
 
class findLoc extends React.Component {
  constructor(props){
    super(props);
    this.state={
      overall_rating:'',
      price_rating:'',
      quality_rating:'',
      clenliness_rating:'',
      review_body:'',
      pickerSelLoc:'',
      queryName:'',
      isLoading:true,
      location:'',
      locs:[]
    }
  }
  
  handleQuery = (text) => {
    this.setState({ queryName: text })
 }
 async getLocs(query){
     //reformat query so it can be used
     console.log("function is called ",query)
     const adaptedQuery = query.replace(/ /g, '%20')
     console.log("Show append query: ",query)
     //fetchj request
    return await fetch ("http://10.0.2.2:3333/api/1.0.0/find?q="+adaptedQuery,
        {
          //set the type of request and and the auth. token
          method: 'GET',
          headers: { 
          'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
        })
       .then((response)=>
       {
        if (response.status == 200) {
            ToastAndroid.show("Tap to select", ToastAndroid.SHORT);
          //if successful return object
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
        console.log(responseJson);
        // responseJson.map((postData) => {
        //      console.log("ResponseJson:  ",postData);
        //      //this.setState({locs: postData})
        //      //this.setState({locs: [...this.state.locs, postData]});
        //      this.state.locs.push(postData)
        // })
        this.setState({locs: responseJson})
        //return responseJson;
       })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        console.log("done loading");
        console.log("Show this.state.locs.location_id: ",this.state.locs);//show that the data is stored correctly
      });
    }
    async componentDidMount(){
      await requestLocationPermission();
      //show all the locs
      this.getLocs(this.state.queryName)
      //get the user's location
      this.setState({ myLoc:await getGeoInfo()});
      // console.log("Just making sure:        ",this.state.reviews);
      this.setState({ isLoading: false });

    }
  render(){
    const nav = this.props.navigation;

     return ( //search for a location and pick from a selection  
      this.state.isLoading ? <Loader/> : (

        <View style={styles.page}>
            <View style={styles.smallContainer}>
                <TextInput style={styles.inputText} placeholder="Shop's name... " onChangeText={this.handleQuery} value= {this.state.queryName} id="name"/>
            </View>
                
            <TouchableOpacity onPress={()=>this.getLocs(this.state.queryName)} style={styles.button}>
              <Text style={styles.appButtonText}>Find Location</Text>
            </TouchableOpacity>
            
                <View style={styles.container}>
                  
                <FlatList //Show location options
                    data={this.state.locs}
                    keyExtractor={item =>( item.location_id.toString())}
                    initialNumToRender={7}
                    renderItem={({ item }) => 
                     <TouchableOpacity
                     style={styles.option}
                    // style={styles.button}
                     onPress={async()=>
                     nav.navigate('Add Review',{location:item})
                     }
                     ListEmptyComponent={
                      <Text style={styles.appButtonText}>Nothing to see here</Text>
                     } 

                   >
                   <Text  style={styles.optionText}>{`${item.location_name}, ${item.location_town}`}</Text>  
                    <Text  style={styles.appButtonText}>{`Distance: ${(calculatePreciseDistance(this.state.myLoc,item)/1000).toString()} km` }</Text>                
                   </TouchableOpacity>
                   }
                />
             </View>
                
         </View>
        ) 
  );
}
}

export default findLoc;
  