import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { PRIMARY, PRIMARY_DARK, BACKGROUND, SECONDARY, ON_PRIMARY } from './utils/colors';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckDetail from './components/DeckDetail';
import Quiz from './components/Quiz';
import AddQuestion from './components/AddQuestion';

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? PRIMARY : SECONDARY,
    inactiveTintColor: Platform.OS === 'ios' ? PRIMARY_DARK : ON_PRIMARY,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? BACKGROUND : PRIMARY,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail
  },
  Quiz: {
    screen: Quiz
  },
  AddQuestion: {
    screen: AddQuestion
  }
}, {
  initialRouteName: 'Home'
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{ backgroundColor: 'black', height: Constants.statusBarHeight }}>
            <StatusBar translucent barStyle='light-content' />
          </View>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}