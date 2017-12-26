/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import SplashScreen from 'react-native-splash-screen'
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Secured from './src/screens/Secured';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


//-----------------------------------
// constants
//-----------------------------------
const SCREEN_LOGIN     = 1;
const SCREEN_REGISTER  = 2;
const SCREEN_SECURED   = 3;


//--------------------------------------------------------------------
//
//              APP SCREEN
//
//--------------------------------------------------------------------
export default class App extends Component<{}> {
//------------------------------------------
//    ComponentDidMount Function
//------------------------------------------
  componentDidMount() {
      // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
  }//ComponentDidMount


  //-------------------
  //  states
  //-------------------
  state = {
    isLoggedIn: false,
    currentScreen: SCREEN_LOGIN,
  }

  render() {
    if (this.state.currentScreen == SCREEN_SECURED) 
      return <Secured 
          onLogoutPress={ () => this.setState({currentScreen: SCREEN_LOGIN}) }
        />;

  if (this.state.currentScreen == SCREEN_LOGIN) 
      return <Login 
          onLoginPress ={() => this.setState({currentScreen: SCREEN_SECURED})}
          onRegisterPress={() => this.setState({currentScreen: SCREEN_REGISTER})}
        />;

    if (this.state.currentScreen == SCREEN_REGISTER) 
      return <Register 
          onLoginPress ={() => this.setState({currentScreen: SCREEN_LOGIN})}
          onRegisterDone={() => this.setState({currentScreen: SCREEN_SECURED})}
        />;


  }//render
}//App

//---------------------
//     STYLES
//---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
