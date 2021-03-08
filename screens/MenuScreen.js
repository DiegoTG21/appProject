import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import styles from '../styles/basic.styles.js'
//the menu screen allows the user to navigate to all the possible screens
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

export default MenuScreen;