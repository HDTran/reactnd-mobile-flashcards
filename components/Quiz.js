import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Quiz extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Quiz</Text>
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

export default Quiz;