import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class DeckDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DeckDetail</Text>
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

export default DeckDetail;