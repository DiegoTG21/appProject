import React, { Component } from 'react';
import {  Text,StyleSheet,TouchableOpacity } from 'react-native';

const MyBtn = ({ onPress, btnText }) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.appButtonText}>{btnText}</Text>
    </TouchableOpacity>
  )
const styles = StyleSheet.create({
    button: {
        flex:1,
        borderRadius: 10,
        borderColor:'black',
        fontSize:30,
        alignItems: "center",
        backgroundColor: "magenta",
        padding: 30
    
      },
      appButtonText:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }});
 export default MyBtn;