import React, { Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Button,ActivityIndicator} from 'react-native';
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';

class Location extends Component {
    constructor(props){
        super(props);
        this.state={
        map:false
        }
    }
    showOnMap(location)
    {
        <View>
                   { console.log("Show on map is called")}
        <MapView
         pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false} 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.latitude, 
              longitude: location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            }}
            />
            <Button onPress={() => console.log(this.state.location )} title="show on log" /> 
     </View>
    };
    showMoreInfo()
    {

    };
    render()
    {
        const location=this.props.data;
        return(
            <View>
            <View>
                <Text>Shop name: {location.location_name}</Text>
                <Text>Town: {location.location_town}</Text>
                <Text>Avg rating: {location.avg_overall_rating}</Text>
             </View>
             <View>
            <MapView
              pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false} 
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                    latitude: location.latitude, 
                    longitude: location.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                  }}
                  >
                  <Marker coordinate={{
                     latitude: location.latitude,
                     
                     longitude:location.longitude 
                     }}/>
              </MapView>
             </View>
            </View>);
    }
}
const styles = StyleSheet.create({
    map: {
        height: 400,
        margin: 10,
        borderWidth: 1,
        borderColor: '#000000',
      },
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      flex:10,
      borderRadius: 10,
      borderColor:'black',
      fontSize:30,
      alignItems: "center",
      backgroundColor: "magenta",
      marginVertical: 20,
      marginHorizontal: 12,
      padding: 30

    }
     });
export default Location;