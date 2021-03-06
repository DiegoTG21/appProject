import React, { Component } from 'react';
import { ActivityIndicator, Text, View, Dimensions, Image,StyleSheet } from 'react-native';
import Stars from 'react-native-stars';
import LikeButton from './LikeButton';
import AsyncStorage from '@react-native-community/async-storage';
//used to display the pictures
const SCREEN_WIDTH = Dimensions.get("window").width;
class LocReview extends Component {
    constructor(props){
        super(props);
        this.state={
          locationID:this.props.locationID,
          review:this.props.data,
          image:'',
          isLoading: true,
          user:'',
          userID:'',
          map:false
        }
    }
    //tries to get the picture for each review if avaliable
    async getPic(review){
        console.log("http://10.0.2.2:3333/api/1.0.0/location/"+  this.state.locationID +"/review/" +review.review_id)
              return await fetch ("http://10.0.2.2:3333/api/1.0.0/location/"+   this.state.locationID +"/review/"
               +review.review_id+ "/photo",
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
    onErrorLoadingImg=()=>
        {
            console.log("Error loading pic");
            this.setState({displayImage:false})
        }
    async getUsername(){
        console.log(" ids",this.state.review.review_user_id.toString(),await AsyncStorage.getItem('@userID'));
        //if the review belongs to the user display 'you' 
        if (this.state.review.review_user_id.toString()==await AsyncStorage.getItem('@userID')){
            this.setState({user:'you'})
        }
        else{//get the name of the user that posted the rev
        return await fetch ("http://10.0.2.2:3333/api/1.0.0/user/"+ this.state.review.review_user_id,
            {
            //set the type of request and and the auth. token
            method: 'GET',
            headers: { 
            'X-Authorization':await AsyncStorage.getItem('@sessionToken') },
            })
        .then((response)=>
        {
            if (response.status == 200) {
            //if successful return object
            return response.json()
            } else if (response.status == 400) {
            throw 'Bad request.';
            } else {
            throw 'Problem getting user.' + response.status;
            }
        })
        .then(async (responseJson)=> { 
            //onsole.log("json object:   ", responseJson.reviews);
        // await AsyncStorage.setItem('@userData', {responseJson});
            this.setState({user: responseJson.first_name})
            this.setState({ isLoading:false});

        })
        .catch((error) => {
            console.error(error);
        });
        }
    };
    async componentDidMount(){
        console.log(this.state.review)
        this.setState({image: await this.getPic(this.state.review)})
        this.getUsername();
        this.setState({ isLoading:false});
    }

    render(){
        const review=this.state.review;
        console.log("see the review: ",review);

        return(
            <View style={styles.container}>
             {this.state.isLoading ? <ActivityIndicator/> : (

                <View style={styles.review} >
                    <Text style={styles.text} >Overall rating:</Text>
                    {/* these stars allow the user to add reviews from 0 to 5  */}
                    <Stars
                    half={true}
                    display={review.review_overallrating}
                    spacing={4}
                    starSize={45}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>Price rating</Text>
                    <Stars
                    half={true}
                    display={review.review_pricerating}
                    spacing={4}
                    starSize={35}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>Quality rating</Text>
                    <Stars
                    half={true}
                    display={review.review_qualityrating}
                    spacing={4}
                    starSize={35}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>Clenliness rating</Text>
                    <Stars
                    half={true}
                    display={review.review_clenlinessrating}
                    spacing={4}
                    starSize={35}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>"{review.review_body}"</Text>


                    <Text style={styles.text}>Posted by: {this.state.user}</Text>                
                    { this.state.image ? 
                    <Image 
                        style={styles.image}
                        source={{uri: (this.state.image)}}
                        onError={this.onErrorLoadingImg}
                        /> : (<Text style={styles.info}>No photos avaliable</Text>)//if there is not a photo avaliable
                    }
                    <LikeButton 
                    likes={review.likes}
                    revID={review.review_id}
                    userID={review.review_user_id}
                    locID={review.review_location_id} />
                    </View>)}
            </View>
        );
    }
}
const styles = StyleSheet.create({    
    image:{
        height:SCREEN_WIDTH* 0.70,
        width:SCREEN_WIDTH* 0.70,
        marginVertical: 4

     },

     text:{
        fontSize: 15,
        color: "black",
        textDecorationColor: "magenta",
        textShadowRadius: 1,
        margin: 2
     },
     info:{
        fontSize: 11,
        color: "black",
        textShadowRadius: 1,
        padding:5,
        margin: 2
     },
    container: {
        flex: 10,
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
    review: {
        flex:9,
        justifyContent: "center",
        paddingHorizontal: 4,
        paddingVertical: 4,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flex:1,
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
export default LocReview;