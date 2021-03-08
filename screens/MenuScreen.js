import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
//rimport AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/basic.styles.js'

class MenuScreen extends Component{

 
  render(){

    const nav = this.props.navigation;
    return(
      
        <View style={styles.page} >
              <TouchableOpacity
            style={styles.button}
            onPress={()=>nav.navigate('Find the location')}
          >
            <Text style={styles.menuButtonText}>Add review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('Discover')}
          >
          <Text style={styles.menuButtonText}>Discover</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('Search')}
          >
            <Text style={styles.menuButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('My Reviews')}
          >
            <Text style={styles.menuButtonText}>My reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('Upload Photo')}
          >
            <Text style={styles.menuButtonText}>Upload photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=> nav.navigate('My Account')}
          >
            <Text style={styles.menuButtonText}>My account</Text>
          </TouchableOpacity>
        </View>
    );
  }

}
// const styles = StyleSheet.create({
//   page:{
//     flex:10,
//     paddingTop:5
//   },
//   menuButtonText:{
//     fontSize: 20,
//     color: "black",
//     fontWeight: "bold",
//     alignSelf: "center",
//     textTransform: "uppercase"
//   },
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       paddingHorizontal: 10
//     },
//     button: {
//       flex:1,
//       borderRadius: 10,
//       borderColor:'black',
//       fontSize:30,
//       //align Vertically center
//       justifyContent: 'center',
//       // align horizontally center
//       alignItems: 'center',
//       backgroundColor: "magenta",
//       marginVertical: 10,
//       marginHorizontal: 12,
//       padding: 30
//     }, menuButtonText:{
//       fontSize: 20,
//       color: "black",
//       fontWeight: "bold",
//       alignSelf: "center",
//       textTransform: "uppercase"
//     },
//     countContainer: {
//       alignItems: "center",
//       padding: 10
//     }});
export default MenuScreen;