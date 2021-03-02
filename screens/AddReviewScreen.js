import React, { Component } from 'react';
import { TextInput, Text, Button, View, FlatList, TouchableOpacity,StyleSheet,ToastAndroid } from 'react-native';
import Stars from 'react-native-stars';
import AsyncStorage from '@react-native-community/async-storage';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
class AddReviewScreen extends Component {
    constructor(props){
        super(props);
 
        this.state={
          overall_rating:'',
          price_rating:'',
          quality_rating:'',
          clenliness_rating:'',
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
  async addNewReview(){
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
        review_body:this.state.review_body
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
            <Text>Location: {this.state.location.location_name}</Text>       
            <View>
                <Text>Overall rating</Text>
                <Stars
                half={true}
                default={2.5}
                update={(val)=>{this.setState({overall_rating: val})}}
                spacing={4}
                starSize={45}
                count={5}
                fullStar={require('./images/starFilled.png')}
                emptyStar={require('./images/starEmpty.png')}
                halfStar={require('./images/starHalf.png')}/>
                <Text>Price rating</Text>
                <Stars
                half={true}
                default={2.5}
                update={(val)=>{this.setState({price_rating: val})}}
                spacing={4}
                starSize={35}
                count={5}
                fullStar={require('./images/starFilled.png')}
                emptyStar={require('./images/starEmpty.png')}
                halfStar={require('./images/starHalf.png')}/>
                <Text>Quality rating</Text>
                <Stars
                half={true}
                default={2.5}
                update={(val)=>{this.setState({quality_rating: val})}}
                spacing={4}
                starSize={35}
                count={5}
                fullStar={require('./images/starFilled.png')}
                emptyStar={require('./images/starEmpty.png')}
                halfStar={require('./images/starHalf.png')}/>
                <Text>Clenliness rating</Text>
                <Stars
                half={true}
                default={2.5}
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
                onPress={()=>this.addNewReview().then(()=>
                  {this.props.navigation.navigate('Home') })}//}
                >
                <Text>Submit</Text>
            </TouchableOpacity>
            </View>
        </View>
        );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      flex:10,
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
    countContainer: {
      alignItems: "center",
      padding: 10
    }});
  export default AddReviewScreen;