import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';


import * as API from '../utils/api'
import { addDeck } from "../actions/index";

class AddDeck extends Component {

    state = {
        title: ''
    }

    componentWillMount() {
        this.props.navigation.addListener('willFocus', this.willFocus);
    }

    willFocus = a => {
        console.log('TABS EVENT...', a.type, a);
        this.setState({title: ''})
    };

    createDeck = () => {
        Keyboard.dismiss()
        const { dispatch, navigation } = this.props
        const uuidv1 = require('uuid/v1');
        const key = uuidv1();
        const deck = {title: this.state.title, questions: []}

        API.addDeck(key, deck).then(() => {
            dispatch(addDeck(key, deck))
            this.setState({title: ''})
            navigation.navigate('DeckDetail', {keyDeck: key, deck})
        })

    }

    render() {
        const { navigation, decks } = this.props
        const buttonDisabled = this.state.title.trim().length === 0
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.title}>What is the title of your new deck?</Text>
                    <TextInput
                        value={this.state.title}
                        onChangeText={(text) => this.setState({title: text})}
                        placeholder="Title"
                        onSubmitEditing={Keyboard.dismiss}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                    />


                    <Button onPress={this.createDeck}
                            disabled={buttonDisabled}
                            buttonStyle={{backgroundColor: 'rgba(78, 116, 289, 1)', width: null, height: 40, marginTop: 20}}
                            textStyle={{color: 'white', marginHorizontal: 20}}
                            title='Create Deck'
                    />

                </View>
            </TouchableWithoutFeedback>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    btn: {
        marginTop: 20,
    },
    input: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderColor: 'rgba(171, 189, 219, 1)',
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        padding: 20,
        fontSize: 20,
        textAlign: 'center'
    },
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(AddDeck)
