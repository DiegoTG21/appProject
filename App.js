import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login';
import MenuScreen from './screens/MenuScreen';
import SearchScreen from './screens/SearchScreen';
import MyAccountScreen from './screens/MyAccountScreen';
import RegisterScreen from './screens/RegisterScreen';
import AddReviewScreen from './screens/AddReviewScreen';
import MyReviewsScreen from './screens/MyReviewsScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import findLoc from './screens/findLoc';
import AddPhoto from './screens/AddPhoto';
import LocationScreen from './screens/LocationScreen';
import LikedReviews from './screens/LikedReviews';

//import {t,getLan}from './locales/getLan';

 
const Stack = createStackNavigator();

export default function App() { 

 return (   
   
     <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login"  component={Login} />
            <Stack.Screen name="Upload Photo" component={AddPhoto} />
            <Stack.Screen name="Find the location" component={findLoc} />
            <Stack.Screen name="Home" component={MenuScreen} />
            <Stack.Screen name="Search" component={SearchScreen} /> 
            <Stack.Screen name="My Reviews" component={MyReviewsScreen} /> 
            <Stack.Screen name="Liked Reviews" component={LikedReviews} /> 
            <Stack.Screen name="My Account" component={MyAccountScreen} /> 
            <Stack.Screen name="Discover" component={DiscoverScreen} /> 
            <Stack.Screen name="Register" component={RegisterScreen} /> 
            <Stack.Screen name="Add Review" component={AddReviewScreen} /> 
            <Stack.Screen name="Shop's location"  component={LocationScreen} />


        </Stack.Navigator>
      </NavigationContainer> 
       
  );
}
