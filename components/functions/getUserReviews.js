
import AsyncStorage from '@react-native-community/async-storage';

export async function getUserReviews(){
    return await fetch ("http://10.0.2.2:3333/api/1.0.0/user/"+ await AsyncStorage.getItem('@userID'),//change for the final version
        {
          //set the type of request and and the auth. token
          method: 'GET',
          headers: { 
          'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
        })
       .then((response)=>
       {
        if (parseInt(response.status,10) == 200) {
          //if successful return object
          return response.json()
        } else if (parseInt(response.status,10) == 400) {
          throw 'Bad request.';
        } else {
          throw 'Problem getting data.';
        }
       })
       .then(async (responseJson)=> { 
        //onsole.log("json object:   ", responseJson.reviews);
       // await AsyncStorage.setItem('@userData', {responseJson});
        
        return responseJson.reviews;
  
       }).then(async (reviews)=> {
        return reviews
       })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        console.log("done loading");
      });
    }