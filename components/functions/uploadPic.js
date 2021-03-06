
import { View, StyleSheet, ToastAndroid,TouchableOpacity ,Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export async function endToServer (picture,review){
    console.log('Location of pic is: ',picture.uri);

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+review.location.location_id+"/review/"+review.review.review_id+"/photo",
    {
      method: 'POST',
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": await AsyncStorage.getItem('@sessionToken')
      },
      body: picture
    })
    .then(async (response) => {
    if (response.status===200)
    {
        ToastAndroid.show("Uploaded!",ToastAndroid.SHORT);
        await AsyncStorage.setItem('@picUploadedIndicator', "true");
    }
    else{
      console.log("Status" ,response.status)
        ToastAndroid.show('Invalid',ToastAndroid.SHORT);

    }
    })
    .catch((error) => {
      console.error(error);
    });
  }
