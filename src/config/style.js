import { StyleSheet } from 'react-native';

const GlobalStyle = StyleSheet.create({
  	container: {
    	borderRadius: 4,
    	borderWidth: 0.5,
    	borderColor: '#d6d7da',
    	padding: 10,
  	},
  	title: {
    	fontSize: 19,
    	fontWeight: 'bold',
  	},
  	activeTitle: {
    	color: 'red',
	},
  	button: {
    	color: '#146C80',
  	}
});

export default GlobalStyle;