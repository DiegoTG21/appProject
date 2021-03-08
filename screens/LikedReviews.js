import React, { Component } from 'react';
import { ActivityIndicator, Text, StyleSheet, View, FlatList,ListItem, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ReviewList from '../components/ReviewList';
import Loader from '../components/Loader';
import styles from '../styles/basic.styles.js'

class LikedReviews extends React.Component {
    constructor(props){
        super(props);
 
        this.state={
            //get data from myAccountScreen
            likedReviews:props.route.params.data,
        }
    }
  render(){
      console.log(this.state.likedReviews.toString())
    return (  
      this.state.isLoading ? <Loader/> : (

            <ReviewList reviews={(this.state.likedReviews)} />
      )
      );
  }
}
// const styles = StyleSheet.create({
//     page:{
//         flex:10,
//         paddingTop:5
//       },
//     nameText :{
//         fontSize: 18,
//         color: 'black',
//         fontWeight: 'bold',
//         alignContent: 'center',
//         textAlign:'center'
//       },
//     map: {
//         flex:3,
//         borderWidth: 1,
//         borderColor: '#000000',
//       },
//     locContainer: {
//       height:"50%",
//       paddingVertical:3
//     },
//     button: {
//         flex:1,
//         borderRadius: 10,
//         borderColor:'black',
//         fontSize:30,
//         //align Vertically center
//         justifyContent: 'center',
//         // align horizontally center
//         alignItems: 'center',
//         backgroundColor: "magenta",
//         marginVertical: 20,
//         marginHorizontal: 12,
//         padding: 30
//     }
//      });
export default LikedReviews;
