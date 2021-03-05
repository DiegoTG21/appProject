import React, { Component } from 'react';
import { TextInput, Text, ListItem, View, FlatList,TouchableOpacity, StyleSheet,ToastAndroid } from 'react-native';
// import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
// import {requestLocationPermission,getCoordinates} from '../components/LocPermissions';
// import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
 import buttonStyle from '../styles';
 //import {t,getLan}from '../locales/getLan';

class SearchScreen extends React.Component {
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
      town:'',
      overallRating:'',
      qualityRating:'',
      clenlinessRating:'',
      priceRating:'',
      isLoading:true,
      location:'',
      colourBtnAddRev:'grey',
      colourBtnSeeLoc:'magenta',
      addReview:true,//used to know what the user wants to do
      locs:[]
    }
  }
  
  handleQuery = (text) => {
    this.setState({ queryName: text })
 }
 handleTownQuery  = (text) => {
  this.setState({ town: text })
}
handleOverallRatQuery = (text) => {
  let numbers = '0123456789';
  if(numbers.indexOf(text) > -1 ) {
    this.setState({ overallRating: text })
  }
  else {
      // your call back function
      ToastAndroid.show("please enter numbers only", ToastAndroid.SHORT);
  }

}
handleQualityRatQuery = (text) => {
  let numbers = '0123456789';
  if(numbers.indexOf(text) > -1 ) {
    this.setState({ qualityRating: text })
  }
  else {
      // your call back function
      ToastAndroid.show("please enter numbers only", ToastAndroid.SHORT);
  }
}
handleClenlinessRatQuery = (text) => {
  let numbers = '0123456789';
  if(numbers.indexOf(text) > -1 ) {
    this.setState({ clenlinessRating: text })
  }
  else {
      // your call back function
      ToastAndroid.show("please enter numbers only", ToastAndroid.SHORT);
  }
}
handlePriceRatQuery = (text) => {
  let numbers = '0123456789';
  if(numbers.indexOf(text) > -1 ) {
    this.setState({ priceRating: text })
  }
  else {
      // your call back function
      ToastAndroid.show("please enter numbers only", ToastAndroid.SHORT);
  }
}

 async getLocs(){
     //reformat query so it can be used
     console.log("function is called ",query)
     const query = this.state.queryName.replace(/ /g, '%20')
     console.log("Show append query: ",query)
     //fetchj request
    return await fetch ("http://10.0.2.2:3333/api/1.0.0/find?q="+query +
    "&&overall_rating="+this.state.overallRating+
    "&&price_rating="+this.state.priceRating+
    "&&clenliness_rating="+this.state.clenlinessRating+
    "&&quality_rating="+this.state.qualityRating,
        {
          //set the type of request and and the auth. token
          method: 'GET',
          headers: { 
          'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
        })
       .then((response)=>
       {
        if (response.status == 200) {
            ToastAndroid.show("Done!", ToastAndroid.SHORT);
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
   directToScreen(location)
   {//go to the selected screen
     if(this.state.addReview){
      this.props.navigation.navigate('Add Review',{location:location})
    }
    else{
      this.props.navigation.navigate("Shop's location",{location:location})
    }
   }
   changeSelect(state)
 {        
      this.setState({addReview:state})
      //both cannot be selected at the same time so the colours have to match
      if(state==true)
      {
        this.setState({colourBtnAddRev:'grey'})
        this.setState({colourBtnSeeLoc:'magenta'})

      }
      else{
        this.setState({colourBtnAddRev:'magenta'})
        this.setState({colourBtnSeeLoc:'grey'})
      }
      ToastAndroid.show("Select a location", ToastAndroid.SHORT);
      //update the action
 }
  render(){
     return (   
        <View style={styles.page}>
            <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.optionBtn, {backgroundColor: this.state.colourBtnAddRev}]} 
            onPress={()=>this.changeSelect(true)
            //inform review list what to do with the selected review
              } >
              <Text style={styles.appButtonText}>Add a review</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionBtn, {backgroundColor: this.state.colourBtnSeeLoc}]} 
            onPress={()=>this.changeSelect(false)  
              //inform review list what to do with the selected review
            } >
              <Text style={styles.appButtonText}>See info</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <TextInput  placeholder="Shop's name or location... " onChangeText={this.handleQuery} value= {this.state.queryName} id="name"/>
                <TextInput maxLength={1}  keyboardType='numeric'
                 placeholder="Overall rating... " onChangeText={this.handleOverallRatQuery} value= {this.state.overallRatQuery} id="oveRat"/>
                <TextInput maxLength={1}  keyboardType='numeric'
                placeholder="Quality rating... " onChangeText={this.handleQualityRatQuery} value= {this.state.qualityRating} id="qualRat"/>
                <TextInput maxLength={1}  keyboardType='numeric'
                placeholder="Clenliness rating... " onChangeText={this.handleClenlinessRatQuery} value= {this.state.clenlinessRating} id="clenRat"/>
                <TextInput maxLength={1}  keyboardType='numeric'
                placeholder="Price rating... " onChangeText={this.handlePriceRatQuery} value= {this.state.priceRating} id="priceRat"/>


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
                     this.directToScreen(item)
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
    appButtonText:{
      fontSize: 12,
      color: "black",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    container: {
      flex:15,
      flexDirection: 'column',
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
    btnContainer:{
      flex:1,
      flexDirection: 'row',
      marginVertical: 5
      },
      container: {
        flex:5,
        flexDirection: 'column',
        justifyContent: 'center'
      },
    optionBtn: {
      flex:1,
      width:'40%',
      borderRadius: 10,
      borderColor:'black',
      fontSize:30,
      //align Vertically center
      justifyContent: 'center',
      // align horizontally center
      alignItems: 'center',
      backgroundColor: "magenta",
      marginVertical: 5,
      marginHorizontal: 5,
      padding: 30
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
export default SearchScreen;
  