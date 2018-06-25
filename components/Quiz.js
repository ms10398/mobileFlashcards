import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Animated, Button, Easing, StyleSheet, Text, View} from 'react-native';
import {Button as Btn} from 'react-native-elements'
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";

class Quiz extends Component {

    static navigationOptions = ({ navigation }) => {
      const keyDeck = navigation.state.params.deck
      console.log(keyDeck);
      return {
        title: `${keyDeck.title} - Quiz`,
        style: {height: 0,paddingTop: 0}
      }
    }

    state = {
        index: 0,
        showAnswer: false,
        corrects: 0,
        incorrects: 0,
        opacity: new Animated.Value(1),
    }

    toogleQuestionAndAnswer = () => {
        this.state.opacity.setValue(0)
        this.setState({showAnswer: !this.state.showAnswer})
        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }
        ).start()
    }

    submitAnswer = (correct) => {
        if(correct) {
            this.setState({corrects: (this.state.corrects + 1)})
        } else {
            this.setState({incorrects: (this.state.incorrects + 1)})
        }
        this.setState({index: (this.state.index + 1), showAnswer: false})

        const deck = this.props.decks[this.props.navigation.state.params.keyDeck]
        if(this.state.index >= deck.questions.length) {
            clearLocalNotification().then(setLocalNotification())
        }

    }

    restartQuiz = () => {
        this.setState({index: 0, corrects: 0, incorrects: 0, showAnswer: false})
    }

    renderQuiz = (deck, index) => {
        const animatedText = index < deck.questions.length ? (this.state.showAnswer ? deck.questions[this.state.index].answer : deck.questions[this.state.index].question) : ''
        return (
            <View>
                <Text style={styles.subTitle}>
                    {this.state.index+1}/{deck.questions.length}
                </Text>

                <Animated.Text style={[styles.text, {opacity: this.state.opacity}]}>
                    {animatedText}
                </Animated.Text>

                <Btn
                  buttonStyle={{backgroundColor: 'blue', width: null, height: 40, marginTop: 30, borderRadius: 15}}
                  onPress={this.toogleQuestionAndAnswer}
                  title={`${this.state.showAnswer ? 'Show Question' : 'Show Answer'} `}/>

                <Btn onPress={() => this.submitAnswer(true)}
                     buttonStyle={{backgroundColor: 'green', width: null, height: 40, marginTop: 30, borderRadius: 10}}
                     textStyle={{color: 'white', marginHorizontal: 20}}
                     title='Correct'
                     disabled={!this.state.showAnswer}
                />

                <Btn onPress={() => this.submitAnswer(false)}
                     buttonStyle={{backgroundColor: 'red', width: null, height: 40, marginTop: 5, borderRadius: 10}}
                     textStyle={{color: 'white', marginHorizontal: 20}}
                     title='Incorrect'
                     disabled={!this.state.showAnswer}
                />
            </View>
        )
    }

    renderEndQuiz = () => (
        <View>
            <Text style={styles.subTitle}>
              Quiz Over
            </Text>
            <Text style={styles.subTitle}>
                Correct: {this.state.corrects}
            </Text>
            <Text style={styles.subTitle}>
                Incorrect: {this.state.incorrects}
            </Text>

            <Btn
              buttonStyle={{backgroundColor: 'blue', width: null, height: 40, marginTop: 5, borderRadius: 10}}
              onPress={this.restartQuiz} title='Restart Quiz'/>

            <Btn
              buttonStyle={{backgroundColor: 'green', width: null, height: 40, marginTop: 5, borderRadius: 10}}
              onPress={() => this.props.navigation.goBack()} title='Back to Deck'/>

        </View>
    )

    render() {
        const {navigation, decks} = this.props
        const keyDeck = navigation.state.params.keyDeck
        const deck = decks[keyDeck]
        const index = this.state.index

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Quiz - {deck.title}
                </Text>

                {index < deck.questions.length ? (
                    this.renderQuiz(deck, index)
                ) : (
                    this.renderEndQuiz()
                )}
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
    text: {
        marginTop: 20,
        padding: 5,
        fontSize: 22,
        textAlign: 'center'
    },
})

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(Quiz)
