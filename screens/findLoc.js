import React, { Component } from 'react';
import { TextInput, Text, ListItem, View, FlatList,TouchableOpacity, StyleSheet,ToastAndroid } from 'react-native';
// import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
// import {requestLocationPermission,getCoordinates} from '../components/LocPermissions';
// import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
 import buttonStyle from '../styles';
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
        this.setState({ isLoading: false });
        console.log("done loading");
        console.log("Show this.state.locs.location_id: ",this.state.locs);//show that the data is stored correctly
      });
    }

  render(){
    const nav = this.props.navigation;

     return (   
        <View style={styles.page}>
            <View>
                <TextInput placeholder="Shop's name... " onChangeText={this.handleQuery} value= {this.state.queryName} id="name"/>
            </View>
                
            <TouchableOpacity onPress={()=>this.getLocs()} style={styles.button}>
              <Text style={buttonStyle}>Find Location</Text>
            </TouchableOpacity>
            
                <View style={styles.container}>
                  
                <FlatList //Show location options
                    data={this.state.locs}
                    keyExtractor={item =>( item.location_id.toString())}
                     renderItem={({ item }) => 
                     <TouchableOpacity
                     style={styles.option}
                    // style={styles.button}
                     onPress={async()=>
                     nav.navigate('Add Review',{location:item})
                     }

                   >
                     <Text>{`${item.location_name}, ${item.location_town}` }</Text>
                   </TouchableOpacity>
                   }
                />
             </View>
                
         </View>
  );
}
}
const styles = StyleSheet.create({
  page:{
    flex:10,
    paddingTop:5
  },
  image:{
        height: 400,
        margin: 10,
        borderWidth: 1,
        borderColor: '#000000'
        },
    container: {
      flex:15,
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderWidth: 2,
      borderColor: '#000000',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      margin: 20
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
      marginVertical: 20,
      marginHorizontal: 12,
      padding: 30
    },
    option: {
      flex:1,
      //align Vertically center
      justifyContent: 'center',
      // align horizontally center
      alignItems: 'center',
      backgroundColor: "#D3D3D3",
      marginVertical: 1,
      padding: 10
    }
     });
export default findLoc;
  