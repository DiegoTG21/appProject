import React, { Component } from 'react';
import { ActivityIndicator, Text, Button, View, FlatList,ListItem, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ReviewList from '../components/ReviewList';
const Loader = () => (
  <View style={{ minHeight: 230, padding: 20 }}>
    <ActivityIndicator
      color="#000"
      size="large"
      style={{ alignSelf: "center" }}
    />
  </View>
);
class MyReviewsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      reviews:[],
      selectIndicator:false,
      actionOnSelect:'',
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
    if(this.state.selectIndicator==true){
      this.setState({selectIndicator:false})
      this.setState({actionOnSelect:action})

    }
    else{
      this.setState({selectIndicator:true})
      this.setState({actionOnSelect:action})

    }
 }
  render(){
    return (  
      this.state.isLoading ? <Loader/> : (
      <View>
        <TouchableOpacity onPress={()=>this.changeSelect("addPic")
         //inform review list what to do with the selected review
          } >
          <Text >Add a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.changeSelect("delete")
        //inform review list what to do with the selected review
        } >
          <Text >Delete review</Text>
        </TouchableOpacity>
        <ReviewList reviews={(this.state.reviews) } 
         selectIndicator={this.state.selectIndicator}
         actionOnSelect={this.state.actionOnSelect} />
     </View>
      )
    );
  }
}
export default MyReviewsScreen;
