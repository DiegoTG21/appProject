import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, TextInput, View, TouchableOpacity, StyleSheet,Button,ToastAndroid } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { ThemeContext } from 'react-navigation';
// import {requestLocationPermission,findCoordinates} from './LocPermissions';
import {t,getLan}from '../locales/getLan';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email:'f@gmail.com',
      password:'password'
    }
  }
handleEmailInput=(email)=>{
  //set the email
//REMEMBER TO ADD VALI.
this.setState({email:email})
}
handlePasswordInput=(password)=>{
  //set the password
//REMEMBER TO ADD VALI.
this.setState({password:password})
}
  async serverLogin(){
    console.log("login in");

     return fetch("http://10.0.2.2:3333/api/1.0.0/user/login",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      })
     .then((response)=>
     {
      if (response.status == 200) {
        ToastAndroid.show("You are logged on!", ToastAndroid.SHORT);
        return response.json()
      } else if (response.status == 400) {
        throw 'Wrong email or password.';
      } else {
        throw 'Problem login in.' + response.status;
      }
     })
     .then(async (responseJson)=> {
      console.log(responseJson);
      await AsyncStorage.setItem('@sessionToken', responseJson.token);
      await AsyncStorage.setItem('@userID', responseJson.id.toString());
      console.log("Going to home screen");
      this.props.navigation.navigate('Home');
    })
    .catch((error) => {
      console.error(error);
    });
  }
// componentDidMount(){
//     getLan();
//     requestLocationPermission();
//     findCoordinates(locPermission);
//   }

static navigationOptions = {
  header: null
}

  render() {
    const nav = this.props.navigation;

    return (
      <View style={styles.container}>
      <View style={styles.container}>
        {/* contains the login inputs */}
           <TextInput placeholder="Email... " onChangeText={this.handleEmailInput} value= {this.state.email}/>
          <TextInput placeholder="Password... " secureTextEntry={true} onChangeText={this.handlePasswordInput} value= {this.state.password}/>
      </View>
      <View style={styles.container}>
      <TouchableOpacity
      style={styles.button}
      onPress={()=> this.serverLogin()}
    >
      <Text>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={()=>  nav.navigate('Register')}
    >
      <Text>Register</Text>
    </TouchableOpacity>
    </View>
    </View>


    );
  }

}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      //flexWrap: 'wrap',
      marginVertical: 20,
      marginHorizontal: 12,
    },
    button: {
      flex:1,
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

    }
     });

export default Login;
