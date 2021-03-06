
import AsyncStorage from '@react-native-community/async-storage';
//CANT BE USED IN LOCREVIEW.JS BECAUSE OF FORMATING REASONS
export  async function getPic(review){
    console.log("http://10.0.2.2:3333/api/1.0.0/location/"+  review.location.location_id +"/review/" +review.review.review_id)
          return await fetch ("http://10.0.2.2:3333/api/1.0.0/location/"+  review.location.location_id +"/review/"
           +review.review.review_id+ "/photo",
        {
          //set the type of request and and the auth. token
          method: 'GET',
          headers: { 
          'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
        })
       .then((response)=>
       {
        console.log("almost there")
        if (response.status == 200) {
          //if successful return object
          return response.url

        } else if( response.status == 404) {
          console.log("No picture found") ;
        } else {
          throw 'Problem getting picture.';
        }
       })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        console.log("done getting pic");
      });
    
    }