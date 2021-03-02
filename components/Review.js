import React, { Component } from 'react';
import { ActivityIndicator, Text, Button, View, FlatList, Image,StyleSheet,TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Stars from 'react-native-stars';
import LocationScreen from '../screens/LocationScreen';
import LikeButton from './LikeButton';
class Review extends Component {
    constructor(props){
        super(props);
        this.state={
          displayImage:true,
          isLoading: true,
          map:false
        }
    }
    onErrorLoadingImg=()=>
        {
            console.log("Error loading pic");
            this.setState({displayImage:false})
        }
        componentDidMount(){
            this.setState({ review: this.props.data});
            this.setState({ isLoading:false});
        }
    render(){
        const review=this.props.data;
        console.log("see the review: ",review);
        
        return(
            <View style={styles.container}>
             {this.state.isLoading ? <ActivityIndicator/> : (

                <View style={styles.review} >
                    <Text style={styles.nameText} >{`${review.location.location_name}, ${review.location.location_town}` }</Text>
                    <Text style={styles.text} >Overall rating:</Text>
                    {/* these stars allow the user to add reviews from 0 to 5  */}
                    <Stars
                    half={true}
                    display={review.review.overall_rating}
                    spacing={4}
                    starSize={45}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>Price rating:</Text>
                    <Stars
                    half={true}
                    display={review.review.price_rating}
                    spacing={4}
                    starSize={35}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>Quality rating:</Text>
                    <Stars
                    half={true}
                    display={review.review.quality_rating}
                    spacing={4}
                    starSize={35}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>Clenliness rating:</Text>
                    <Stars
                    half={true}
                    display={review.review.clenliness_rating}
                    spacing={4}
                    starSize={35}
                    count={5}
                    fullStar={require('./images/starFilled.png')}
                    emptyStar={require('./images/starEmpty.png')}
                    halfStar={require('./images/starHalf.png')}/>
                    <Text style={styles.text}>"{review.review.review_body}"</Text>
                </View>)}
{/*                      
                        <Image 
                        style={styles.image}
                        source={{uri:review.location.photo_path.toString()}}
                        onError={this.onErrorLoadingImg}
                        /> */}
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={()=>console.log("Not working")
                        }
                    >
                <Text>Show on map</Text>
            </TouchableOpacity>             */}
                {/* <Location data={review.location}/> */}
                <LikeButton 
                    likes={review.review.likes}
                    revID={review.review.review_id}
                    userID={review.review.review_user_id}
                    locID={review.location.location_id} />
            </View>
        );
    }
}
const styles = StyleSheet.create({    
    image:{
        height: 400,
        margin: 10,
        borderWidth: 1,
        borderColor: '#000000'
     },
     nameText :{
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        alignContent: 'center',
        textAlign:'center'
      },
     text:{
        color: "black",
        textDecorationColor: "yellow",
        textShadowColor: "red",
        textShadowRadius: 1,
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