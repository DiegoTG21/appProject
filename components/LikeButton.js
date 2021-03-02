import React, { Component } from 'react';
import { Button,StyleSheet,ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class LikeButton extends Component {
    constructor(props){
        super(props);
        this.state={
            likes: this.props.likes,
            locID:this.props.locID,
            revID:this.props.revID,
            userID:this.props.userID
      }
    };
    showBtn=async()=>
    {
            if(this.state.userID.toString()==await AsyncStorage.getItem('@userID')){
                console.log("IDs matched!!");

                return <Button  title={this.state.likes.toString()} />
            }
            else{
                console.log("IDs didnt match");
            return <Button title={this.state.likes.toString()} />
            }
        }
    addLike =async () => {
        //fetchj request
    return await fetch ("http://10.0.2.2:3333/api/1.0.0/location/"
        +this.state.locID+"/review/"
        +this.state.revID+"/like",
        {
        //set the type of request and and the auth. token
        method: 'POST',
        headers: { 
        'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
        })
    .then((response)=>
    {
        if (response.status == 200) {
            ToastAndroid.show("Liked!", ToastAndroid.SHORT);
            console.log(response);
        //if successful return object
        } else if (response.status == 400) {
        throw 'Bad request.';
        } else {
        throw 'Problem dealing with the request.' + response.status;
        }
    })
    .catch((error) => {
        console.error(error);
    });
    };
    render() {
        {console.log(this.state)}
          return ( <Button  onPress={this.addLike} title={this.state.likes.toString()} />)
      }
    };
export default LikeButton;    