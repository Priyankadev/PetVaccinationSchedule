import React, { Component } from "react";
import { Text } from "react-native";
import { Provider, connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import SplashScreen from 'react-native-splash-screen'


import Routes from "./config/routes"

import getStore from "./store";

const AppNavigator = StackNavigator(Routes);

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

//connect(state => ({
  //  nav: state.nav
//}))
class AppWithNavigationState extends Component {

  //------------------------------------------
  //    ComponentDidMount Function
  //------------------------------------------
  componentDidMount() {
      // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
  }//ComponentDidMount


  render() {

    	console.log("-- AppWithNavigationState render() --");

        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        nav: state.nav
    };
}
 
var Connected__AppWithNavigationState = connect(mapStateToProps)(AppWithNavigationState);

const store = getStore(navReducer);

export default class App extends Component  {

	render() {
    	return (
        	<Provider store={store}>
            	<Connected__AppWithNavigationState />
        	</Provider>
    	);
	}
}//App