import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks().then((decks) => { dispatch(receiveDecks(decks)); });
  }
  render() {
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        {Object.values(decks).length > 0 && Object.values(decks).map((deck) => (
          <Text key={deck.title}>{deck.title}. {deck.questions.length} cards.</Text>
        ))}
        {Object.values(decks).length === 0 && (
          <Text>You currently have no decks to view. Please add a deck.</Text>
        )}
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

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);