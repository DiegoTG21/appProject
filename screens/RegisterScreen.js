import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Alert,Button,ToastAndroid } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
import styles from '../basic.styles.js'
class RegisterScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:'',
      comfPassword:''
    }
  }
  handleFName = (text) => {
    this.setState({ first_name: text })
 }
 handleSName = (text) => {
    this.setState({ last_name: text })
 }
  handleEmail = (text) => {
    this.setState({ email: text })
 }
 handlePassword = (text) => {
    this.setState({ password: text })
 }
handleConfirmPassword = (text) => {
  this.setState({ comfPassword: text })
}
validate=(state)=>{
  let isValid = true;
  if (! state.first_name) {
    isValid = false;
    ToastAndroid.show("Please enter your name.", ToastAndroid.SHORT);

  }
  if (! state.last_name) {
    isValid = false;
    ToastAndroid.show("Please enter your second name.", ToastAndroid.SHORT);

  }
  if (! state.email) {
    isValid = false;
    ToastAndroid.show("Please enter your email.", ToastAndroid.SHORT);

  }
  if (typeof state.email !== "undefined") {
          
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(state.email)) {
      isValid = false;
      ToastAndroid.show("Enter a valid email.", ToastAndroid.SHORT);
    }
  }
  if (typeof (state.password) !== "undefined" && typeof (state.comfPassword) !== "undefined") {
    if(state.password!=='' && state.comfPassword!=='')
    { 
      if (state.password != state.comfPassword) {
        isValid = false;
        ToastAndroid.show("Passwords don't match.", ToastAndroid.SHORT);

      }
    }else{
      isValid = false;
      ToastAndroid.show("One or both of your passwords are missing.", ToastAndroid.SHORT);
    }
  }
  else
  {
    isValid = false;
    ToastAndroid.show("Passwords error.", ToastAndroid.SHORT);

  }
  if (isValid)
  {
  return this.addNewUser();
  }
}
addNewUser(){
  return fetch("http://10.0.2.2:3333/api/1.0.0/user",
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    })
  })
  .then((response)=>
  {
    //if created then go to menu
   if (response.status == 201) {
     Alert.alert("You are now registered!");
     return response.json()
     //if bad request
   } else if (response.status == 400) {
    Alert.alert('You are already registered or your information wasnt correct.')
   } else {
     throw 'Problem registering.' + response.status;
   }
  })
  .then(async (ResponseJson)=> {
    if(ResponseJson!==null)
    {//if they successfully register then login
          await AsyncStorage.setItem('@userId', ResponseJson.id.toString());
          this.props.navigation.navigate('Login');
    }
 })
 .catch((error) => {
   console.error(error);
 });
}

    render() {
      const nav = this.props.navigation;
      return (
       <View>
          <TextInput style={styles.inputText} placeholder="First name... " onChangeText={this.handleFName} value= {this.state.first_name} id="fname"/>
          <TextInput style={styles.inputText} placeholder="Last name... " onChangeText={this.handleSName} value= {this.state.last_name}id="sname"/>
          <TextInput style={styles.inputText} placeholder="Email... "type="email" onChangeText={this.handleEmail} value= {this.state.email}id="email"/>
          <RNPasswordStrengthMeter  meterType="bar"
          placeholder="Password... " type="password"  onChangeText={this.handleConfirmPassword}id="conpassword" />
          <RNPasswordStrengthMeter  meterType="bar"
           secureTextEntry={true} 
           inputProps= {{
            placeholder: 'Confirm password...',
            secureTextEntry: true,

        }}
         type="password"  onChangeText={this.handlePassword} id="password"/>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> this.validate(this.state)}
          >
            <Text style={styles.appButtonText}>Register</Text>
          </TouchableOpacity>
       </View>
      );
    }
  }
 
  export default RegisterScreen;