import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';


//--------------------------------------------------------------------
//
//              REGISTER SCREEN
//
//--------------------------------------------------------------------
export default class RegisterScreen extends Component {


    static navigationOptions = {
        title: "PMS Register"
    };

	//--------------
	// states
	//--------------
    

    constructor(props) {
        super(props);

        this.state = {
            isRegistering: false,
            name: '',
            password: '',
            email:'',
            answer:'',
            message:''
        }

        this.clearName = this.clearName.bind(this);
        this.clearPassword = this.clearPassword.bind(this);
        this.clearEmail = this.clearEmail.bind(this);
        this.clearAnswer = this.clearAnswer.bind(this);


    }


	//--------------------------------------------------
	//  function to register user
	//--------------------------------------------------
    _userRegister = () => { 
    	console.log('--User Register--');
    	this.setState({isRegistering: true, message:''});


    	var params = {
            email: this.state.email,
            password: this.state.password,
            answer: this.state.answer,
            name: this.state.name
        };

        
        //--------------------------
        // composing form body
        //--------------------------
        var formBody=[];
        for(var property in params){
        	var encodeKey = encodeURIComponent(property);
        	var encodedValue = encodeURIComponent(params[property]);
        	formBody.push(encodeKey+ "=" + encodedValue);
        }
        formBody=formBody.join("&");
        console.log("--formBody--" + formBody);

        //---------------------------------------
        // sending register request to server
        //---------------------------------------
        var proceed=false;
        fetch('https://w-pet.herokuapp.com/api/register', {
        	method: "POST",
        	headers: {
        		'Content-Type': 'application/x-www-form-urlencoded'
        	},
        	body : formBody
        })
		.then((response) => {
			console.log("--1 response--" + JSON.stringify(response) );
			return response.json()
		})
		.then((response) => {
			console.log("--2 response--" + response);
			if(response.error) this.setState({message:response.message});
			else proceed=true;
		})
		.then(() => {
			this.setState({isRegistering:false})
			//if(proceed) this.props.onRegisterDone();
		})
		.done();
    }//UserRegister

    clearName = () => {
        this._name.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }
    clearEmail = () => {
        this._email.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }
    clearAnswer = () => {
        this._answer.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }



    render() {

        console.log("-- RegisterScreen render(), state: " + JSON.stringify(this.state));

        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Register
                </Text>
                <TextInput
                    ref={component => this._email = component}
                    placeholder='Email' 
                    onChangeText={(email) => this.setState({email})}
                    autoFocus={true}
                    onFocus={this.clearEmail}
                />

                <TextInput
                    ref={component => this._name = component}
                    placeholder='Name' 
                    onChangeText={(name) => this.setState({name})}
                    autoFocus={true}
                    onFocus={this.clearName}
                />
                <TextInput 
                    ref={component => this._password = component}
                    placeholder='Password' 
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                    onFocus={this.clearPassword}
                    onSubmitEditing={this._userLogin}
                />
                <TextInput
                    ref={component => this._answer = component}
                    placeholder='Security Answer' 
                    onChangeText={(answer) => this.setState({answer})}
                    autoFocus={true}
                    onFocus={this.clearAnswer}
                />
                                {!!this.state.message && (
                    <Text
                        style={{fontSize: 14, color: 'red', padding: 5}}>
                    {this.state.message}
                    </Text>
                )}

                {this.state.isRegistering && <ActivityIndicator />}
                
                <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
                  <Button 
                    disabled={this.state.isRegistering||!this.state.name||!this.state.password||!this.state.email||!this.state.answer}
                    onPress={this._userRegister}
                    title="Register"
                  />
                  <Button 
                    onPress={ () => this.props.navigation.navigate("Login")}
                    title="Login"
                  />
                </View>
            </ScrollView>
        )//return
    }//render
}//RegisterScreen