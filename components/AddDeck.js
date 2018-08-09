import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class AddDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AddDeck</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#FFF',
    padding: 15
  }
});

export default AddDeck;