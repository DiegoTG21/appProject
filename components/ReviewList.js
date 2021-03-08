import React, { Component } from 'react';
import { View, FlatList,Text, TouchableOpacity,ToastAndroid,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Review from './Review';
import {endToServer} from './functions/uploadPic';
import styles from '../styles/basic.styles.js'

//Displays a list of reviews and takes multiple parameters so the user can 
//select reviews to add or delete pictures and delete reviews too
class ReviewList extends Component {
    constructor(props){
        super(props);
        this.state={
          picture:'',
          reviews:this.props.reviews
          }
    }

    //comfirm delete action
    askForConfirmation()
    {
      new
      console.log(1)
       return new Promise((resolve) => {
        console.log(2)

        Alert.alert(
          'Are you sure you want to delete it?',
          'It will be gone forever',
          [   
            {
              text: 'Cancel',
              onPress: () => resolve(true),
              style: 'cancel'
            },
            { text: 'OK', onPress: () => resolve(false)}
          ],
          console.log(5),

          { cancelable: false }
        )
      });
    } 
    //take in the action and the selected review and make a decision
    async decideNextStep(action,review,image)
    {
      // await AsyncStorage.setItem('@picUploadedIndicator', "false");
      this.setState({reviewSelected:true})

      if(action=="addPicture"){//if the user wants to upload a picture

        //add the photo to the database
        endToServer(image,review)
      }
      else{       
      //ask the user to confirm and then delete
        await this.askForConfirmation().then((cancel)=>{
        if(cancel==false)
        {
          if(action=="delete"){//if delete review
          console.log("Going to delete")
          this.deleteReview(review)
        } 
        else{// delete photo
          this.deletePhoto(review)
         }
        }
        else{
          console.log("You cancelled");

        } }).catch((error) => {
          console.error(error);
        })
     }

    }
    //deleets a photo from the server
    async deletePhoto(review)
    {
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+review.location.location_id.toString()+
      "/review/"+ review.review.review_id.toString()+"/photo",
    {
      method: 'DELETE',
      headers: {
        "X-Authorization": await AsyncStorage.getItem('@sessionToken')
      },
    })
    .then(async (response) => {
    if (response.status===200)
    {
        ToastAndroid.show("Photo deleted!",ToastAndroid.SHORT);
    }
    else{
      console.log("Status" ,response.status)
        ToastAndroid.show('Opps!',ToastAndroid.SHORT);

    }
    })
    .catch((error) => {
      console.error(error);
    });
    }
    //delete review from flatlist
    deleteItemById(id) {
      const filteredReviews = this.state.reviews.filter(item => item.review.review_id !== id);
      this.setState({ reviews: filteredReviews });
    }

    //delete review from DB
    async deleteReview(review){
      console.log("http://10.0.2.2:3333/api/1.0.0/location/"+  review.location.location_id +"/review/" +review.review.review_id)
            return await fetch ("http://10.0.2.2:3333/api/1.0.0/location/"+  review.location.location_id +"/review/" +review.review.review_id,
          {
            //set the type of request and and the auth. token
            method: 'DELETE',
            headers: { 
            'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
          })
         .then((response)=>
         {
          console.log("almost there")
          if (response.status == 200) {
            //if successful return object
            this.deleteItemById(review.review.review_id);
            ToastAndroid.show("Deleted!",ToastAndroid.SHORT);
          } else if( response.status == 400) {
            throw 'Bad request.';
          } else {
            throw 'Problem getting data.';
          }
         })
        .catch((error) => {
          console.error(error);
        }).finally(() => {
          console.log("done deleting");
        });
      
      }
      async componentDidMount(){
      this.setState({ uploadedPic: await AsyncStorage.getItem('@picUploadedIndicator') });
      }
render(){
    const selectIndicator= this.props.selectIndicator;
    const actionOnSelect= this.props.actionOnSelect;
    const image= this.props.image;

   //  console.log("review lists checkpoint: ",reviews);
    return(
            <View>
                <FlatList
                data={this.state.reviews}
                keyExtractor={item =>( item.review.review_id.toString())}
                // ListFooterComponent={<Text>You reached the end</Text>}
                // onEndReachedThreshold={0.1}
                 initialNumToRender={7}
                 ListEmptyComponent={
                  <Text style={styles.appButtonText}>Nothing to see here</Text>
                 }  
                renderItem={({ item }) => 
                {                                                       
                  if (selectIndicator ==true) {
                     return (   
                       <TouchableOpacity onPress={()=>{this.decideNextStep(actionOnSelect,item,image)}} >
                     <Review data={item} /></TouchableOpacity>
                     )
                    }
                  else{
                    return(
                        <Review data={item} />
                        )
                      }
                }}
                />
             </View>
            );
        }
  }
    
  export default ReviewList;