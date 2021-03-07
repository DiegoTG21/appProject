import React, { Component } from 'react';
import { TextInput, Text, ActivityIndicator, View, FlatList,TouchableOpacity, StyleSheet,ToastAndroid } from 'react-native';
// import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
// import {requestLocationPermission,getCoordinates} from '../components/LocPermissions';
// import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import {requestLocationPermission,getGeoInfo,calculatePreciseDistance} from '../components/functions/MapFuncs';
import Loader from '../components/Loader';
import styles from '../basic.styles.js';

 //import {t,getLan}from '../locales/getLan';

class DiscoveryScreen extends React.Component {
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
      myLoc:'',
      locs:[]
    }
  }
  
  handleQuery = (text) => {
    this.setState({ queryName: text })
 }
 async getLocs(){
     //reformat query so it can be used
     console.log("function is called ",query)
     const query = this.state.queryName.replace(/ /g, '%20')
     console.log("Show append query: ",query)
     //fetchj request
    return await fetch ("http://10.0.2.2:3333/api/1.0.0/find?q="+query,
        {
          //set the type of request and and the auth. token
          method: 'GET',
          headers: { 
          'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
        })
       .then((response)=>
       {
        if (response.status == 200) {
            ToastAndroid.show("You got the locs", ToastAndroid.SHORT);
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
      await this.getLocs();
      await requestLocationPermission();
      //get the user's location
      this.setState({ myLoc:await getGeoInfo()});
      // console.log("Just making sure:        ",this.state.reviews);
      this.setState({ isLoading: false });

    }
  render(){
    const nav = this.props.navigation;

     return (   
      this.state.isLoading ? <Loader/> : (//show a list with locations 

        <View style={styles.page}>
          <Text style={styles.titleText}> Pick a location to find out more</Text>
                <View style={styles.container}>
                <FlatList
                    data={this.state.locs}
                    keyExtractor={item =>( item.location_id.toString())}
                     renderItem={({ item }) => 
                     <TouchableOpacity
                    style={styles.option}
                     onPress={async()=>
                     nav.navigate("Shop's location",{location:item})
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
// const styles = StyleSheet.create({
//     page:{
//       flex:10,
//       paddingTop:5
//     },
//   titleText :{
//     fontSize: 20,
//     color: 'black',
//     fontWeight: 'bold',
//     alignContent: 'center',
//     textShadowColor: "magenta",
//     textShadowRadius: 2,
//     textAlign:'center'
//   },
//     image:{
//           height: 400,
//           margin: 10,
//           borderWidth: 1,
//           borderColor: '#000000'
//           },
//     container: {
//       flex:15,
//       paddingHorizontal: 5,
//       paddingVertical: 5,
//       borderWidth: 2,
//       borderColor: '#000000',
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.8,
//       shadowRadius: 2,
//       margin: 20
//     },
//     button: {
//       flex:1,
//       borderRadius: 10,
//       borderColor:'black',
//       fontSize:30,
//       //align Vertically center
//       justifyContent: 'center',
//       // align horizontally center
//       alignItems: 'center',
//       backgroundColor: "magenta",
//       marginVertical: 20,
//       marginHorizontal: 12,
//       padding: 30
//     },
//     option: {
//       flex:1,
//       //align Vertically center
//       justifyContent: 'center',
//       // align horizontally center
//       alignItems: 'center',
//       backgroundColor: "#D3D3D3",
//       marginVertical: 1,
//       padding: 10
//     }
//      });
export default DiscoveryScreen;
  