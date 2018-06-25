import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button as Btn } from 'react-native-elements'
import * as API from '../utils/api'
import { removeDeck } from "../actions/index";

class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => {
      const keyDeck = navigation.state.params.deck
      console.log(keyDeck);
      return {
        title: keyDeck.title,
        style: {height: 0,paddingTop: 0}
      }
    }

    handleDeleteDeck = (keyDeck) => {
        const { dispatch, navigation } = this.props
        API.removeDeck(keyDeck).then(() => {
            dispatch(removeDeck(keyDeck))
            navigation.goBack()
            alert('Deleted')
        })
    }

    render() {
        const {navigation, decks} = this.props
        const keyDeck = navigation.state.params.keyDeck
        const deck = decks[keyDeck]

        if (deck == undefined) {
            return null
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {deck.title}
                </Text>
                <Text style={styles.subTitle}>
                    {deck.questions.length} cards
                </Text>

                <TouchableOpacity style={[styles.button, {borderTopLeftRadius: 5, borderTopRightRadius: 5}]}>
                <Btn
                     buttonStyle={{backgroundColor: 'white', borderColor: 'rgba(78, 116, 289, 1)', borderWidth: 0.5, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                     textStyle={{color: 'rgba(78, 116, 289, 1)'}}
                     onPress={() => navigation.navigate('AddCard', { keyDeck })}
                     title="Add Card"
                />
              </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                <Btn
                     disabled={deck.questions.length === 0}
                     buttonStyle={{backgroundColor: 'white', borderColor: 'rgba(78, 116, 289, 1)', borderWidth: 0.5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
                     textStyle={{color: 'rgba(78, 116, 289, 1)'}}
                     onPress={() => navigation.navigate('Quiz', { keyDeck, deck })}
                     title="Start Quiz"
                />
              </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                <Btn
                    buttonStyle={{backgroundColor: 'blue',marginTop: 10,borderColor: 'rgba(78, 116, 289, 1)', borderWidth: 0.5, borderRadius: 10}}
                    onPress={() => this.handleDeleteDeck(keyDeck)}
                    title={`Remove Deck`}
                />
                </TouchableOpacity>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
        padding: 5,
        fontSize: 22,
        textAlign: 'center'
    },
    subTitle: {
        padding: 5,
        fontSize: 14,
        color: 'gray',
        textAlign: 'center'
    },
    button: {
      marginLeft: 18,
      marginRight: 18,
    }
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckDetail)
