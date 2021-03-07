import React, { Component} from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import LocReview from '../components/LocReview';
import {requestLocationPermission,getGeoInfo,calculatePreciseDistance} from '../components/functions/MapFuncs';
import Loader from '../components/Loader';
import styles from '../basic.styles.js';


class LocationScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            //stores the location when passed from another component
            location:props.route.params.location,
            isLoading:true,
            distance:0,
            myLoc:''
        }
    }
    //distance from the user to the place
    
    async componentDidMount(){
      await requestLocationPermission();
      //get the user's location
      this.setState({ myLoc:await getGeoInfo()});
      //get distance in meters and convert to km
      this.setState({distance:calculatePreciseDistance(this.state.myLoc,this.state.location)/1000});
      this.setState({isLoading:false})
}
    render()
    {
        const location=this.state.location;
        console.log(location.location_reviews)
         
        return(
          //show loader
          this.state.isLoading ? <Loader/> : (
          <View style={styles.page} >
            <View style={styles.locContainer}>
                <Text  style={styles.nameText}>{location.location_name}</Text>
                <Text>Town: {location.location_town}</Text>
                <Text>Average rating: {location.avg_overall_rating}</Text>
                <Text>Average price rating: {location.avg_price_rating}</Text>
                <Text>Average quality rating: {location.avg_quality_rating}</Text>
                <Text>Average clenliness rating: {location.avg_clenliness_rating}</Text>
            {/* show users location and shops location */}
            <MapView
              pitchEnabled={false} rotateEnabled={false} zoomEnabled={true} scrollEnabled={false} 
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                    latitude: location.latitude, 
                    longitude: location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                  }}
                  >
                  <Marker
                   title={location.location_name}
                  coordinate={{
                     latitude: location.latitude,
                     
                     longitude:location.longitude 
                     }}/>
                   <Marker 
                   title={"Me!"}
                   pinColor={'green'} 
                   coordinate={{
                     latitude: this.state.myLoc.latitude,
                     
                     longitude:this.state.myLoc.longitude
                     }}/>
              </MapView>
              <Text>You are {this.state.distance.toString()} KM away.</Text>
            </View>
            <View style={styles.locContainer}>
                  <Text  style={styles.nameText}>Scroll Down to see the reviews</Text>
                  <FlatList
                  data={location.location_reviews}
                  keyExtractor={item =>( item.review_id.toString())}
                  ListEmptyComponent={<Text style={styles.noReviews}>No reviews avaliable</Text>}
                  // ListFooterComponent={<Text>You reached the end</Text>}
                  // onEndReachedThreshold={0.1}

                  renderItem={({ item }) => 
                  <LocReview locationID= {location.location_id} data={item} />
                  }
                  />
            </View>  
          </View>
          )
         );
    }
}
// const styles = StyleSheet.create({
//     page:{
//         flex:10,
//         paddingTop:5
//       },
//       nameText :{
//         fontSize: 18,
//         color: 'black',
//         textShadowColor: "magenta",
//         textShadowRadius: 2,
//         fontWeight: 'bold',
//         alignContent: 'center',
//         textAlign:'center'
//       },
//       noReviews :{
//         fontSize: 14,
//         color: 'black',
//         alignContent: 'center',
//         textAlign:'center',
//         flexDirection: 'column',
//         justifyContent: 'space-between'
//       },
//     map: {
//         flex:3,
//         borderWidth: 1,
//         borderColor: '#000000',
//       },
//     locContainer: {
//       height:"50%",
//       paddingVertical:3
//     },
//     button: {
//         flex:1,
//         borderRadius: 10,
//         borderColor:'black',
//         fontSize:30,
//         //align Vertically center
//         justifyContent: 'center',
//         // align horizontally center
//         alignItems: 'center',
//         backgroundColor: "magenta",
//         marginVertical: 20,
//         marginHorizontal: 12,
//         padding: 30
//     }
//      });
export default LocationScreen;