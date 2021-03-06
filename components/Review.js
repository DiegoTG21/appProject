import React, { Component } from 'react';
import { Text,View, Dimensions, Image,StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Stars from 'react-native-stars';
import AsyncStorage from '@react-native-community/async-storage';
import LikeButton from './LikeButton';
import Loader from './Loader';
import {getPic} from './functions/getPic';

//used to display the pictures
const SCREEN_WIDTH = Dimensions.get("window").width;
class Review extends Component {
    constructor(props){
        super(props);
        this.state={
          review:this.props.data,
          isLoading: true,
          picture:''  
         }
    }
    async  getPic(review){
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
    onErrorLoadingImg=()=>
        {
            console.log("Error loading pic");
        }
        async componentDidMount(){
            this.setState({ review: this.props.data});
            this.setState({image: await getPic(this.state.review)})
            this.setState({ isLoading:false});

        }
    render(){
        const review=this.props.data;
        // console.log("see the review: ", review);
        
        return(
          this.state.isLoading ? <Loader/> : (
            <View style={styles.container}>
                <View style={styles.review} >
                    <Text style={styles.nameText} >{`${review.location.location_name}, ${review.location.location_town}` }</Text>
                    <Text style={styles.text} >Overall rating:</Text>
                    {/* these stars allow the user to add reviews from 0 to 5  */}
                    <Stars
                    display={review.review.overall_rating}
                    spacing={4}
                    starSize={45}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>Price rating:</Text>
                    <Stars
                    display={review.review.price_rating}
                    spacing={4}
                    starSize={35}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>Quality rating:</Text>
                    <Stars
                    display={review.review.quality_rating}
                    spacing={4}
                    starSize={35}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>Clenliness rating:</Text>
                    <Stars
                    display={review.review.clenliness_rating}
                    spacing={4}
                    starSize={35}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.textReview}>"{review.review.review_body}"</Text>
                   
                </View> 
                { this.state.image ? 
                    <Image 
                        style={styles.image}
                        source={{uri: (this.state.image)}}
                        onError={this.onErrorLoadingImg}
                        /> : (<Text>No photos avaliable</Text>)//if there is not a photo avaliable
                    }
                <LikeButton 
                    likes={review.review.likes}
                    revID={review.review.review_id}
                    userID={review.review.review_user_id}
                    locID={review.location.location_id} />
            </View>
          )
        );
    }
}
const styles = StyleSheet.create({    
    image:{
        height:SCREEN_WIDTH* 0.70,
        width:SCREEN_WIDTH* 0.70,
        marginVertical: 4

     },
     nameText :{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        alignContent: 'center',
        textShadowColor: "magenta",
        textShadowRadius: 2,
        textAlign:'center'
      },
     text:{
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
    review: {
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
        alignItems:"flex-start",
        backgroundColor: "magenta",
        marginVertical: 20,
        marginHorizontal: 12,
        padding: 30
  
      }
});
export default Review;