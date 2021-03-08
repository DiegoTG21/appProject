import React, { Component} from 'react';
import {View,Text} from 'react-native';
class User extends Component {
    render(){

        return(
            <View>
                <Text>First name: {this.props.name}</Text>
                <Text>second name: {this.props.surname}</Text>
                <Text>Email: {this.props.email}</Text>
                <Text>Password: {this.props.password}</Text>

            </View>);
    }
}
export default User;