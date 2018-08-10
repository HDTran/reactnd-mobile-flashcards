import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { PRIMARY_DARK, ON_PRIMARY } from '../utils/colors';
import { addDeck } from '../actions';
import { connect } from 'react-redux';
import { saveDeck } from '../utils/api';

class AddDeck extends Component {
  state = {
    text: ''
  }
  handleAddDeck = () => {
    const title = this.state.text;
    const { dispatch } = this.props;
  
    this.setState((state) => ({
      text: ''
    }));
    saveDeck(title).then(() => {
      dispatch(addDeck(title));
    });
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddDeck'
    }));
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ maxWidth: 400 }}>
          <Text style={styles.header}>What is the title of your new deck?</Text>
          <TextInput style={styles.textInput} onChangeText={(text) => this.setState({text})} value={this.state.text} />
          <TouchableOpacity style={styles.button} onPress={this.handleAddDeck}>
            <Text style={styles.buttonText}>Create Deck</Text>
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

export default connect()(AddDeck);