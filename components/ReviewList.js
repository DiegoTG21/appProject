import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import { ActivityIndicator, View, FlatList, TouchableOpacity,Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Review from './Review';

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
          reviews:''
        }
    }
    askForConfirmation()
    {
      new
      console.log(1)
       return new Promise((resolve, reject) => {
        console.log(2)

        Alert.alert(
          'Alert Title',
          'My Alert Msg',
          [
            {
              text: 'Ask me later',
              onPress: () => reject(console.log('Ask me later pressed'))
            },      
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
    async decideNextStep(action,review)
    {
      if(action=="delete"){
        console.log("Made this far")
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
      else{
        //this.add
      }
    }
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
            return response.json()
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
    const reviews=this.props.reviews;
    const selectIndicator= this.props.selectIndicator;
    const actionOnSelect= this.props.actionOnSelect;
   //  console.log("review lists checkpoint: ",reviews);
    return(
      this.state.isLoading ? <Loader/> : (

            <View>
                <FlatList
                data={reviews}
                keyExtractor={item =>( item.review.review_id.toString())}
                // ListFooterComponent={<Text>You reached the end</Text>}
                // onEndReachedThreshold={0.1}

                renderItem={({ item }) => 
                {                                                       
                  if (selectIndicator ==true) {
                     return (   
                       <TouchableOpacity onPress={()=>this.decideNextStep(actionOnSelect,item)} >
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
            );
        }
  }
  export default ReviewList;