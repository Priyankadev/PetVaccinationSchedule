import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator
} from 'react-native';

import React, { Component } from 'react';

import { connect } from 'react-redux';

import {login} from '../actions/user.actions';

import CustomButton from '../components/CustomButton'


class LoginScreen extends Component {


    static navigationOptions = {
        title: "PMS Login"
    };


    //-------------------------
    // states
    //-------------------------


    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoggingIn: false,
            message: ''
        }

        this.clearEmail = this.clearEmail.bind(this);
        this.clearPassword = this.clearPassword.bind(this);

    }


    //-----------------------------------------------
    // function to login user
    //-----------------------------------------------
    _userLogin = () => { 

        console.log("-- _userLogin  --");


        this.setState({isLoggingIn: true, message:''});

        var params = {
            email: this.state.email,
            password: this.state.password
        };
        

        //----------------------------------------
        // composing form body
        //----------------------------------------
        var formBody = [];
        for (var property in params) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(params[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log("-- formBody: " + formBody);

        //----------------------------------------
        // sending login request to server]
        // ---------------------------------------
        var proceed = false;
        var token = '';
        fetch("https://w-pet.herokuapp.com/api/login", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
          })
          .then((response) => response.json())
          .then((response) => {

            console.log("-- _userLogin :: server resp: " + JSON.stringify(response) );


            if (response.error) this.setState({message: response.message});
            else {
             proceed = true;
             token = response.token;
            }
          })
          .then(() => {
            this.setState({isLoggingIn: false})
            if (proceed) {
                this.props.onLogin(this.state.email, token);
                this.props.navigation.navigate("Main");
            }
          })
          .done();

    }//_userLogin

    clearEmail = () => {
        this._email.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }


    render() {
        console.log("-- LoginScreen render()  --");

        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput
                    ref={component => this._email = component}
                    placeholder='Email' 
                    onChangeText={(email) => this.setState({email})}
                    autoFocus={true}
                    onFocus={this.clearEmail}
                />
                <TextInput 
                    ref={component => this._password = component}
                    placeholder='Password' 
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    onSubmitEditing={this._userLogin}
                />


                {!!this.state.message && (
                    <Text
                        style={{fontSize: 14, color: 'red', padding: 5}}>
                    {this.state.message}
                    </Text>
                )}

                {this.state.isLoggingIn && <ActivityIndicator />}
                
                <View style={{margin:7}} />

                <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
                <Button 
                    disabled={this.state.isLoggingIn||!this.state.email||!this.state.password}
                    onPress={this._userLogin}
                    title="Login"
                />
                <Button
                    title="Register"
                    onPress={ () => this.props.navigation.navigate("Register")}
                    
                />
                </View>
                </ScrollView>
            )//return
    }//render
}//LoginScreen


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, token) => { dispatch(login(email, token)); }
        //onSignUp: (email, password) => { dispatch(signup(email, password)); }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);