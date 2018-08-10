import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY_LIGHT, PRIMARY_DARK, ON_PRIMARY } from '../utils/colors';

class DeckListItem extends Component {
  state = {
    bounceValue: new Animated.Value(1)
  }
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;

    return {
      title
    };
  }
  animate = () => {
    const { bounceValue } = this.state;
    const { navigate } = this.props;

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 })
    ]).start(navigate);
  }
  render() {
    const { bounceValue } = this.state;
    const { title, questions } = this.props;
  
    return (
      <View style={styles.deck}>
        <Animated.Text style={[styles.deckHeader, { transform: [{ scale: bounceValue }]}]}>{title}</Animated.Text>
        <Text style={styles.deckText}>{questions.length} cards.</Text>
        <TouchableOpacity style={styles.button} onPress={this.animate}>
          <Text style={styles.buttonText}><MaterialCommunityIcons name='cards' size={24} /> View Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    margin: 10
  },
  deckHeader: {
    fontSize: 24
  },
  deckText: {
    fontSize: 14,
    color: PRIMARY_LIGHT
  },
  button: {
    backgroundColor: PRIMARY_DARK,
    margin: 5,
    borderRadius: 5,
    padding: 10,
    width: 200
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: ON_PRIMARY
  }
});

export default DeckListItem;