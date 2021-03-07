import React, { Component } from 'react';
import {Text, ToastAndroid, View, TouchableOpacity } from 'react-native';
import ReviewList from '../components/ReviewList';
import Loader from '../components/Loader';
import {getUserReviews} from '../components/functions/getUserReviews';
import styles from '../basic.styles.js'
import specificStyles from '../specific.styles.js'

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
        <TouchableOpacity style={[specificStyles.buttonHeader, {backgroundColor: this.state.colourBtnAddPic}]} 
        onPress={()=>this.changeSelect("deletePic")
         //inform review list what to do with the selected review
          } >
          <Text style={styles.appButtonText}>Delete photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[specificStyles.buttonHeader, {backgroundColor: this.state.colourBtnDelete}]} 
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
export default MyReviewsScreen;
