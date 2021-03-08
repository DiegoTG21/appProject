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
            userID:this.props.userID,
            liked:false//liked is false so you cannot like it more than twice

      }
    };
    decideLikeAction = () =>
    {
        if (this.state.liked==false)
        {
            this.handleLike('POST',true);
        }
        else
        {
            this.handleLike('DELETE',false);
        }
    }
    //status= true or false 
    async handleLike(method,likedStatus) {
        //fetchj request
    return await fetch ("http://10.0.2.2:3333/api/1.0.0/location/"
        +this.state.locID+"/review/"
        +this.state.revID+"/like",
        {
        //set the type of request and and the auth. token
        method: method,
        headers: { 
        'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
        })
    .then((response)=>
    {
        if (response.status == 200) {
            ToastAndroid.show("Liked!", ToastAndroid.SHORT);
            console.log(response);
            //update count
            if(likedStatus==true)
            {
            this.setState({likes:this.state.likes+1})
            ToastAndroid.show("Liked!", ToastAndroid.SHORT);

            }
            else{
                this.setState({likes:this.state.likes-1});
                ToastAndroid.show("Disliked:(", ToastAndroid.SHORT);

            }
            this.setState({liked:likedStatus})
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
          return ( <Button  onPress={this.decideLikeAction} title={this.state.likes.toString()} />)
      }
    };
    
export default LikeButton;    