import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import DeckListItem from '../components/DeckListItem';

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks().then((decks) => { dispatch(receiveDecks(decks)); });
  }
  render() {
    const { decks } = this.props;

    return (
      <ScrollView style={styles.container}>
        {Object.values(decks).length > 0 && Object.values(decks).map((deck) => (
          <DeckListItem key={deck.title} title={deck.title} questions={deck.questions} navigate={() => this.props.navigation.navigate('DeckDetail', { title: deck.title })} />
        ))}
        {Object.values(decks).length === 0 && (
          <Text>You currently have no decks to view. Please add a deck.</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);