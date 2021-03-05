import React, { Component } from 'react';
import { ActivityIndicator, Text, ToastAndroid, View, FlatList,StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ReviewList from '../components/ReviewList';
import Loader from '../components/Loader';

class MyReviewsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      reviews:[],
      selectIndicator:false,
      actionOnSelect:'',
      colourBtnDelete:'magenta',
      colourBtnAddPic:'magenta',
      isLoading: true

    }
  }
  async getUserReviews(){
  return await fetch ("http://10.0.2.2:3333/api/1.0.0/user/"+ await AsyncStorage.getItem('@userID'),//change for the final version
      {
        //set the type of request and and the auth. token
        method: 'GET',
        headers: { 
        'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
      })
     .then((response)=>
     {
      if (parseInt(response.status,10) == 200) {
        //if successful return object
        return response.json()
      } else if (parseInt(response.status,10) == 400) {
        throw 'Bad request.';
      } else {
        throw 'Problem getting data.';
      }
     })
     .then(async (responseJson)=> { 
      //onsole.log("json object:   ", responseJson.reviews);
     // await AsyncStorage.setItem('@userData', {responseJson});
      
      return responseJson.reviews;

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
  openMap = (location)=>
  {
    this.props.navigation.navigate("Shop's location",{location: location})
  };
  async componentDidMount(){
    await this.getUserReviews();
    console.log("Just making sure:        ",this.state.reviews);
  }
 changeSelect(action)
 {        
   //change the selection mode and change colours so the user knows
    if(this.state.selectIndicator==true && action==this.state.actionOnSelect){
      this.setState({selectIndicator:false})
      this.setState({actionOnSelect:action})
      //if nothing can be selected both stay pink
      this.setState({colourBtnDelete:'magenta'})
        this.setState({colourBtnAddPic:'magenta'})
    }
    else{ 
       this.setState({selectIndicator:true})
      //both cannot be selected at the same time so the colours have to match
      if(action=="delete")
      {
        ToastAndroid.show("Select a review", ToastAndroid.SHORT);
        this.setState({colourBtnDelete:'grey'})
        this.setState({colourBtnAddPic:'magenta'})

      }
      else{
        this.setState({colourBtnDelete:'magenta'})
        this.setState({colourBtnAddPic:'grey'})
      }
      ToastAndroid.show("Select a review", ToastAndroid.SHORT);
      //update the action
    this.setState({actionOnSelect:action})

    } 

 }
  render(){
    return (  
      this.state.isLoading ? <Loader/> : (
      <View style={styles.page}>
        <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.button, {backgroundColor: this.state.colourBtnAddPic}]} 
        onPress={()=>this.changeSelect("addPic")
         //inform review list what to do with the selected review
          } >
          <Text style={styles.appButtonText}>Add a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: this.state.colourBtnDelete}]} 
        onPress={()=>this.changeSelect("delete")  
          //inform review list what to do with the selected review
        } >
          <Text style={styles.appButtonText}>Delete reviews</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ReviewList reviews={(this.state.reviews) } 
          selectIndicator={this.state.selectIndicator}
          actionOnSelect={this.state.actionOnSelect}
          />
         </View>
     </View>
      )
    );
  }
}
const styles = StyleSheet.create({
  page:{
    flex:10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  btnContainer:{
    flex:1,
    flexDirection: 'row',
    marginVertical: 5
    },
    container: {
      flex:9,
      flexDirection: 'column',
      justifyContent: 'center'
    },
  button: {
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
    
    appButtonText:{
      fontSize: 12,
      color: "black",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }});
export default MyReviewsScreen;
