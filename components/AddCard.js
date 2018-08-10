import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { PRIMARY_DARK, ON_PRIMARY } from '../utils/colors';
import { addCard } from '../actions';
import { connect } from 'react-redux';
import { saveCardToDeck } from '../utils/api';

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title: `Add a Card to ${title}`
    };
  }
  state = {
    questionText: '',
    answerText: ''
  }
  handleAddCard = () => {
    const { questionText, answerText } = this.state;
    const { title } = this.props.navigation.state.params;
    const { dispatch } = this.props;
  
    this.setState(() => ({
      questionText: '',
      answerText: ''
    }));
    saveCardToDeck(title, questionText, answerText).then(() => {
      dispatch(addCard(title, questionText, answerText));
    });
    this.props.navigation.dispatch(NavigationActions.back({ key: null }));
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ maxWidth: 400 }}>
          <Text style={styles.header}>Add a Card</Text>
          <TextInput style={styles.textInput} placeholder={`Question`} onChangeText={(questionText) => this.setState({questionText})} value={this.state.questionText} />
          <TextInput style={styles.textInput} placeholder={`Answer`} onChangeText={(answerText) => this.setState({answerText})} value={this.state.answerText} />
          <TouchableOpacity style={styles.button} onPress={this.handleAddCard}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5
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
  }
});

export default connect()(AddCard);