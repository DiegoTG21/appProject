import React, { Component } from 'react';
import { TextInput, Text, Button, View, FlatList, TouchableOpacity,StyleSheet,ToastAndroid } from 'react-native';
import Stars from 'react-native-stars';
import AsyncStorage from '@react-native-community/async-storage';
import Filter from 'bad-words';
import styles from '../basic.styles.js';

const forbiddenWords=["tea","pastries","food","cakes","cake", "chocalate","Tea","Pastries","Food","Cakes","Cake", "Chocalate"]
class AddReviewScreen extends Component {
    constructor(props){
        super(props);
 
        this.state={
          overall_rating:null,
          price_rating:null,
          quality_rating:null,
          clenliness_rating:null,
          review_body:'',
          pickerSelLoc:'',
          location:props.route.params.location,
          locPermission:false
        }
      }
  
  handleReview=(review)=>{
    //set the review 
  this.setState({review_body:review})
  }
  async sendReview()
  {
    if(this.coffeeDaFilter(this.state.review_body)!==true){
      //add review then go to home screen
      this.addNewReview().then(()=>
      {this.props.navigation.navigate('Home') });
    }
    else{
      ToastAndroid.show("Only talk about coffee :)",ToastAndroid.SHORT);
    }
  }
  //filter certain words
  coffeeDaFilter(text)
  {
    for (var i = 0; i < forbiddenWords.length; i++) {
      if (text.includes(forbiddenWords[i]) || text.includes(forbiddenWords[i])) {
       //if a forbidden word is found let the user know
       console.log("never true")
       return true
      }
    }
  }
  checkInputs()
  {
    let isValid = true;
  //if a value is missing
  if (! this.state.overall_rating || ! this.state.price_rating ||! this.state.clenliness_rating ||! this.state.quality_rating) {
    isValid = false;
    ToastAndroid.show("Tap the stars to add a rating.", ToastAndroid.SHORT);

  }
  if (! this.state.review_body) {
    isValid = false;
    ToastAndroid.show("Please tell us your opinion.", ToastAndroid.SHORT);

  }
  if(isValid)
  {//if valid upload review
    this.sendReview()
  }
  }
  //adds review to the DB
  async addNewReview(){
      //filters the review 
      const filter = new Filter();
   
    //console.log("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.location.location_id+"/review")
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.location.location_id+"/review",
    {
      method: 'POST',
      headers: { //add Authorization
        'Content-Type': 'application/json',
        'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
        body: JSON.stringify({
        overall_rating: parseInt(this.state.overall_rating, 10),
        price_rating: parseInt(this.state.price_rating, 10),
        quality_rating: parseInt(this.state.quality_rating, 10),
        clenliness_rating: parseInt(this.state.clenliness_rating, 10),
        review_body: filter.clean(this.state.review_body)
      })
    })
    .then((response)=>
    {
      //if created then go to menu
     if (response.status == 201) {
       ToastAndroid.show("You uploaded your review! ",ToastAndroid.SHORT);
       console.log("Add review response",response)
       //if bad request
     } else if (response.status == 400) {
       throw 'Your review did not meet our standards.';
     } else {
       throw 'Problem uploading your review.' + response.status;
     }
    })
   .catch((error) => {
     console.error(error);
   });
  }
    render(){
      const nav = this.props.navigation;
      //this.state.setState({location:this.props.params.location})
      return (
        <View> 
            <Text style={styles.nameText}>Location: {this.state.location.location_name}</Text>       
            <View>
                <Text style={styles.text}>Overall rating</Text>
                <Stars
                default={0}
                update={(val)=>{this.setState({overall_rating: val})}}
                spacing={4}
                starSize={45}
                count={5}
                fullStar={require('./images/starFilled.png')}
                emptyStar={require('./images/starEmpty.png')}
                halfStar={require('./images/starHalf.png')}/>
                <Text style={styles.text}>Price rating</Text>
                <Stars
                default={0}
                update={(val)=>{this.setState({price_rating: val})}}
                spacing={4}
                starSize={35}
                count={5}
                fullStar={require('./images/starFilled.png')}
                emptyStar={require('./images/starEmpty.png')}
                halfStar={require('./images/starHalf.png')}/>
                <Text style={styles.text}>Quality rating</Text>
                <Stars
                default={0}
                update={(val)=>{this.setState({quality_rating: val})}}
                spacing={4}
                starSize={35}
                count={5}
                fullStar={require('./images/starFilled.png')}
                emptyStar={require('./images/starEmpty.png')}
                halfStar={require('./images/starHalf.png')}/>
                <Text style={styles.text}>Cleanliness rating</Text>
                <Stars
                default={0}
                update={(val)=>{this.setState({clenliness_rating: val})}}
                spacing={4}
                starSize={35}
                count={5}
                fullStar={require('./images/starFilled.png')}
                emptyStar={require('./images/starEmpty.png')}
                halfStar={require('./images/starHalf.png')}/>
                <TextInput
                numberOfLines={4}
                style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text =>this.handleReview(text)}
                placeholder="Tell us what you think here!"
                />
                <TouchableOpacity
                style={styles.button}
                onPress={()=>this.checkInputs()}//}
                >
                <Text>Submit</Text>
            </TouchableOpacity>
            </View>
        </View>
        );
    }
  }
  export default AddReviewScreen;