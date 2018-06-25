import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import * as API from '../utils/api'
import { fetchDecks } from "../actions/index";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {AppLoading} from 'expo';
import { initData } from '../utils/helpers'

export class DecksList extends Component {
    state = {
      ready: false,
    };
    componentDidMount() {
        API.fetchDecks().then(decks => {
            this.props.fetchDecks(decks)
        })
        .then(() => this.setState(() => ({ready: true})))
    }

    render() {
        const { navigation, decks } = this.props
        const {ready} = this.state
        if (ready === false) {
          return <AppLoading/>
        }
        return (
            <List>
                {Object.keys(decks).map(key => (
                    <ListItem key={key}
                        onPress={() => navigation.navigate('DeckDetail', {keyDeck: key, deck: decks[key]})}
                        title={decks[key].title}
                        subtitle={`${decks[key].questions.length} cards`}
                        leftIcon={(
                          <MaterialCommunityIcons size={32} style={{paddingRight: 10}} name='cards-outline'/>
                        )}
                    />
                ))}
            </List>
        )
    }

}

const mapStateToProps = (state) => {
  console.log(state);
  const decks = Object.keys(state).length === 0? initData():state
  console.log(decks);
  return {decks: decks}
}
const mapDispatchToProps = { fetchDecks }
export default connect(mapStateToProps, mapDispatchToProps)(DecksList)
