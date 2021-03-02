import React, { Component } from 'react';
import { View, Text, TextInput, Button, ToastAndroid,StyleSheet,TouchableOpacity } from 'react-native';
//rimport AsyncStorage from '@react-native-async-storage/async-storage';

class MenuScreen extends Component{

 
  render(){

    const nav = this.props.navigation;
    return(
      
        <View style={styles.page} >
              <TouchableOpacity
            style={styles.button}
            onPress={()=>nav.navigate('Find the location')}
          >
            <Text>Add review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('Discover')}
          >
            <Text>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('Search')}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('My Reviews')}
          >
            <Text>My reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('My Account')}
          >
            <Text>My account</Text>
          </TouchableOpacity>
        </View>
    );
  }

}
const styles = StyleSheet.create({
  page:{
    flex:10,
    paddingTop:5
  },
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
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
      marginVertical: 10,
      marginHorizontal: 12,
      padding: 30
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    }});
export default MenuScreen;