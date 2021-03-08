import React, { Component } from 'react';
//import { TextInput, Text, Button, View, FlatList, TouchableOpacity } from 'react-native';
import Login from '../components/Login';
class LoginScreen extends Component {
  
    render(){
      StatusBar.setBackgroundColor("pinkblack", true)
      return (
             <Login/>
        );
    }
  }
  
  export default LoginScreen;
  