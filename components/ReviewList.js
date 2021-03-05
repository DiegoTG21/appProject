import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import { ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity,ToastAndroid,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Review from './Review';
import AddPhoto from '../screens/AddPhoto';

const Loader = () => (
  <View style={{ minHeight: 230, padding: 20 }}>
    <ActivityIndicator
      color="#000"
      size="large"
      style={{ alignSelf: "center" }}
    />
  </View>
);
 
class ReviewList extends Component {
    constructor(props){
        super(props);
        this.state={
          reviews:this.props.reviews,
          reviewSelected:false
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
    async decideNextStep(action,review)
    {
      this.setState({reviewSelected:true})
      if(action=="delete"){
        //dont show camera
        //ask the user to confirm and then delete
        await this.askForConfirmation().then((cancel)=>{
        if(cancel==false)
        {
          console.log("Going to delete")
          this.deleteReview(review)}
        else{
          console.log("You cancelled");

        } }).catch((error) => {
          console.error(error);
        })
      }
      else{// add photo
        //store the loc id and review id 
        await AsyncStorage.setItem('@locID', review.location.location_id.toString());
        await AsyncStorage.setItem('@reviewID', review.review.review_id.toString());
        this.setState({showRevs:false})
       }
    }
    //delete from flatlist
    deleteItemById(id) {
      const filteredReviews = this.state.reviews.filter(item => item.review.review_id !== id);
      this.setState({ reviews: filteredReviews });
    }
    //delete from DB
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
render(){
    const selectIndicator= this.props.selectIndicator;
    const actionOnSelect= this.props.actionOnSelect;
   //  console.log("review lists checkpoint: ",reviews);
    return(
      
      this.state.isLoading ? <Loader/> : (
        
        (actionOnSelect=="addPic"&& selectIndicator && this.state.reviewSelected)  ? 
               <AddPhoto/> 
             :(
                 //if the user is not adding a picture
            <View>
                <FlatList
                data={this.state.reviews}
                keyExtractor={item =>( item.review.review_id.toString())}
                // ListFooterComponent={<Text>You reached the end</Text>}
                // onEndReachedThreshold={0.1}

                renderItem={({ item }) => 
                {                                                       
                  if (selectIndicator ==true) {
                     return (   
                       <TouchableOpacity onPress={()=>{this.decideNextStep(actionOnSelect,item)}} >
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
              )
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
  export default ReviewList;