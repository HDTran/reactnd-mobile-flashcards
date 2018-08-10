import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { PRIMARY_LIGHT } from '../utils/colors';

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
          <Text style={styles.questionCount}>{questions.length} questions.</Text>
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
  }
});

function mapStateToProps (state, props) {
  const { title } = props.navigation.state.params;

  return {
    deck: state[title]
  }
}

export default connect(mapStateToProps)(DeckDetail);