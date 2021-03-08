import { StyleSheet, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get("window").width;
export default StyleSheet.create({
    button: {
      flex:1,
      borderRadius: 10,
      borderColor:'black',
      //align Vertically center
      justifyContent: 'center',
      // align horizontally center
      alignItems: 'center',
      backgroundColor: "magenta",
      marginVertical: 12,
      marginHorizontal: 12,
      padding: 20
    },
    page:{
      flex:10,
      flexDirection: 'column',
      justifyContent: 'center'
      },
    appButtonText:{
      fontSize: 16,
      color: "black",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    // buttonHeader: {
    //   flex:1,
    //   width:'40%',
    //   borderRadius: 10,
    //   borderColor:'black',
    //   fontSize:30,
    //   //align Vertically center
    //   justifyContent: 'center',
    //   // align horizontally center
    //   alignItems: 'center',
    //   backgroundColor: "magenta",
    //   marginVertical: 5,
    //   marginHorizontal: 5,
    //   padding: 30
    //   },
    container: {
      flex:9,
      flexDirection: 'column',
       justifyContent: 'center'
    },
    smallContainer: {
      flex:4,
      flexDirection: 'column',
       justifyContent: 'center'
    },
    btnContainer:{
      flex:1,
      flexDirection: 'row',
      marginVertical: 5
      },
      // container: {
      //   flex:5,
      //   flexDirection: 'column',
      //   justifyContent: 'center'
      // },
    optionBtn: {
      flex:1,
      width:'40%',
      borderRadius: 10,
      borderColor:'black',
      fontSize:30,
      //align Vertically center
      justifyContent: 'center',
      // align horizontally center
      alignItems: 'center',
      backgroundColor: "magenta",
      marginVertical: 5,
      marginHorizontal: 5,
      padding: 30
      },
    option: {
      flex:1,
      //align Vertically center
      justifyContent: 'center',
      // align horizontally center
      alignItems: 'center',
      backgroundColor: "white",
      borderRadius: 10,
      marginVertical: 1,
      padding: 10
    },
    optionText: {
      fontSize: 16,
      color: 'magenta',
      alignContent: 'center',
      textShadowColor: "black",
      textShadowRadius: 3,
      textAlign:'center'
    },
    inputText:{
      fontSize:16,
    },
    map: {
      flex:3,
      margin: 10,
      borderWidth: 1,
      borderColor: '#000000',
    },
    locContainer: {
      height:"50%",
      paddingVertical:3
    },
    image:{
      height:SCREEN_WIDTH* 0.70,
      width:SCREEN_WIDTH* 0.70,
      marginVertical: 4

   },
    menuButtonText:{
      fontSize: 20,
      color: "black",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    },
    nameText :{
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      alignContent: 'center',
      textShadowColor: "magenta",
      textShadowRadius: 2,
      marginVertical: 5,
      textAlign:'center'
    },
    text:{
      textAlign: 'center',
      fontSize: 15,
      color: "black",
      textDecorationColor: "magenta",
      textShadowRadius: 1,
      margin: 2
   },
   textReview:{
      fontSize: 18,
      color: "black",
      paddingVertical: 15,
      margin: 2
   },
    noReviews :{
      fontSize: 14,
      color: 'black',
      alignContent: 'center',
      textAlign:'center',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
  locContainer: {
    height:"50%",
    paddingVertical:3
  },
  review: {
    justifyContent: "center",
    paddingHorizontal: 4,
    paddingVertical: 4,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center'
},
info:{
  fontSize: 11,
  color: "black",
  textShadowRadius: 1,
  padding:5,
  margin: 2
},
  titleText :{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    alignContent: 'center',
    textShadowColor: "magenta",
    textShadowRadius: 2,
    textAlign:'center'
  }
  });
