import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid } from 'react-native';
import { getPreciseDistance} from 'geolib';

  //ask the user for permission to use their location
  export async function requestLocationPermission() {
    try {
        console.log('asking/checking for permission');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Lab04 Location Permission',
          message:
            'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  //get user's loc
  export  async function getGeoInfo() {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
         position => {

             resolve(position.coords);
         },
         error => reject("Could not obtain geolocation", error),
         { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
       )
    })
 }
 export function calculatePreciseDistance  (coor1,coor2) {
   //calculate distance in meters
  var pdis = getPreciseDistance(
    {latitude: coor1.latitude, longitude: coor1.longitude},
    {latitude: coor2.latitude, longitude: coor2.longitude},
  );
  return pdis
  // alert(
  //   `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
  // );
}
export function getIcon  () {
  var icon = {
 url:require('../images/meIcon.png') ,
  scaledSize:(50, 50), // scaled size
  }
  return icon
  // alert(
  //   `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
  // );
};