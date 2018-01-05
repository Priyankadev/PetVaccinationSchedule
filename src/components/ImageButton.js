import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

class ImageButton extends Component {
  render() {
    const { title, img, onPress} = this.props;
    return (
      <TouchableOpacity style={styles.buttonStyle}
      onPress={() => onPress()}
      >
      <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={img} style={{width: 20, height: 20}} />
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      </TouchableOpacity>
    );
  }
}


ImageButton.propTypes = {
  title: PropTypes.string.isRequired,
  //imgPath: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};


const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginLeft: 10
  },
  
  buttonStyle: {
    padding: 4,
    backgroundColor: '#146C80',
    borderRadius: 10
  }
});

export default ImageButton;