import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PRIMARY_LIGHT, PRIMARY_DARK, ON_PRIMARY, SECONDARY, ON_SECONDARY } from '../utils/colors';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    };
  }
  render() {
    const { title, questions } = this.props.deck;
    return (
      <View style={styles.container}>
        <View style={{ maxWidth: 400 }}>
          <Text style={styles.header}>{title}</Text>
          <Text style={styles.questionCount}>{questions.length} cards.</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('AddCard', { title })}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          {questions.length > 0 && (
            <TouchableOpacity style={styles.buttonQuiz} onPress={() => this.props.navigation.navigate('Quiz', { title, questions })}>
              <Text style={styles.buttonQuizText}>Start Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 36,
    textAlign: 'center'
  },
  questionCount: {
    color: PRIMARY_LIGHT,
    textAlign: 'center',
    fontSize: 24
  },
  button: {
    backgroundColor: PRIMARY_DARK,
    margin: 5,
    borderRadius: 5,
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: ON_PRIMARY
  },
  buttonQuiz: {
    backgroundColor: SECONDARY,
    margin: 5,
    borderRadius: 5,
    padding: 10
  },
  buttonQuizText: {
    fontSize: 18,
    textAlign: 'center',
    color: ON_SECONDARY
  }
});

function mapStateToProps (state, props) {
  const { title } = props.navigation.state.params;

  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(DeckDetail);