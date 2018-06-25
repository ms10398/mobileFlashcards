import React,{ Component } from 'react';
import {StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createStackNavigator,createBottomTabNavigator} from 'react-navigation';
import {blue, purple, white} from './utils/colors';
import {FontAwesome, Ionicons,MaterialIcons} from '@expo/vector-icons';
import {Constants} from 'expo';
import Decks from "./components/DecksList";
import AddDeck from "./components/AddDeck";
import DeckDetail from "./components/DeckDetail";
import Quiz from "./components/Quiz";
import AddCard from "./components/AddCard";
import {setLocalNotification} from "./utils/helpers";
import {createStore} from 'redux'
import decks from './reducers/index'

const store = createStore(decks)

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <MaterialIcons name='dashboard' size={30} color={tintColor}/>
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? blue : white,
    style: {
      backgroundColor: Platform.OS === 'ios' ? white : blue,
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
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
});

export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={blue} barStyle="light-content"/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
