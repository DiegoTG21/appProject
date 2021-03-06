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
            <Text style={styles.appButtonText}>Add review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('Discover')}
          >
          <Text style={styles.appButtonText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('Search')}
          >
            <Text style={styles.appButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('My Reviews')}
          >
            <Text style={styles.appButtonText}>My reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('Upload Photo')}
          >
            <Text style={styles.appButtonText}>Upload photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('My Account')}
          >
            <Text style={styles.appButtonText}>My account</Text>
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
  appButtonText:{
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
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