import React, { Component } from 'react';
import { ActivityIndicator, Text, ToastAndroid, View, FlatList,StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ReviewList from '../components/ReviewList';
import Loader from '../components/Loader';
import {getUserReviews} from '../components/functions/getUserReviews';

class MyReviewsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      reviews:[],
      selectIndicator:false,
      actionOnSelect:'',
      colourBtnDelete:'magenta',
      colourBtnAddPic:'magenta',
      // picUploadedIndicator:'',
      isLoading: true

    }
  }
  
  openMap = (location)=>
  {
    this.props.navigation.navigate("Shop's location",{location: location})
  };

   changeSelect(action)
 {   
      //used to let other components know when a picture is uploaded, if the mode changes it resets 
    // await AsyncStorage.setItem('@picUploadedIndicator', "false");     
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
     async componentDidMount(){
      this.setState({reviews:await getUserReviews()});
     console.log("Just making sure:        ",this.state.reviews);
       //used to let other components know when a picture is uploaded
  // await AsyncStorage.setItem('@picUploadedIndicator', "false");
  // this.setState({picUploadedIndicator:await AsyncStorage.getItem('@picUploadedIndicator')})
  this.setState({ isLoading: false });
  }
  render(){
    return (  
      this.state.isLoading ? <Loader/> : (
      <View style={styles.page}>
        <View style={styles.btnContainer}>
        <TouchableOpacity style={[styles.button, {backgroundColor: this.state.colourBtnAddPic}]} 
        onPress={()=>this.changeSelect("deletePic")
         //inform review list what to do with the selected review
          } >
          <Text style={styles.appButtonText}>Delete photos</Text>
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
          // picUploadedIndicator={this.state.picUploadedIndicator}
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
