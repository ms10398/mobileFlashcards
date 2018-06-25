import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import * as API from '../utils/api'
import { addCard } from "../actions/index";

class AddCard extends Component {

    static navigationOptions = {
        headerTitle: 'Add Card',
    };

    state = {
        question: '',
        answer: ''
    }

    createCard = () => {
        Keyboard.dismiss()
        const { dispatch, navigation } = this.props
        const card = {question: this.state.question, answer: this.state.answer}
        const key = navigation.state.params.keyDeck
        API.addCard(key, card).then(() => {
            dispatch(addCard(key, card))
            navigation.goBack()
        })
    }

    render() {
        const { navigation, decks } = this.props
        const buttonDisabled = this.state.question.trim().length === 0 || this.state.answer.trim().length === 0
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.title}>Add new card</Text>

                    <TextInput
                        value={this.state.question}
                        onChangeText={(text) => this.setState({question: text})}
                        placeholder="Question"
                        onSubmitEditing={Keyboard.dismiss}
                        style={styles.input}
                        underlineColorAndroid='transparent'
                    />

                    <TextInput
                        value={this.state.answer}
                        onChangeText={(text) => this.setState({answer: text})}
                        placeholder="Answer"
                        onSubmitEditing={Keyboard.dismiss}
                        style={[styles.input, {marginTop: 20}]}
                        underlineColorAndroid='transparent'
                    />


                    <Button onPress={this.createCard} disabled={buttonDisabled}
                            buttonStyle={{backgroundColor: 'rgba(78, 116, 289, 1)', width: null, height: 40, marginTop: 20, borderRadius: 10}}
                            textStyle={{color: 'white', marginHorizontal: 20}}
                            title='Create Card'
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

export default connect(mapStateToProps)(AddCard)
