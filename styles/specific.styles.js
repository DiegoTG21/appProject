import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    buttonHeader: {
            flex:1,
            width:'40%',
            borderRadius: 10,
            borderColor:'black',
            fontSize:28,
            //align Vertically center
            justifyContent: 'center',
            // align horizontally center
            alignItems: 'center',
            backgroundColor: "magenta",
            marginVertical: 5,
            marginHorizontal: 5,
            padding: 20
            },
    container: {
            flex: 4,
            justifyContent: "center",
            paddingHorizontal: 5,
            paddingVertical: 15,
            borderWidth: 2,
            borderColor: '#000000',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            margin: 2,
            alignItems: 'center',
            justifyContent: 'center'
    },
    loginContainer: {
        flexDirection: 'column',
        //flexWrap: 'wrap',
        marginVertical: 20,
        marginHorizontal: 12,
      },
      appNameText :{
        fontSize: 40,
        color: 'magenta',
        fontWeight: 'bold',
        alignContent: 'center',
        paddingVertical: 15,
        textShadowColor: 'black',
        textShadowOffset: {width: 4, height: 4},
        textShadowRadius: 7,
        textAlign:'center'
      }
});
