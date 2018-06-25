import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'secretsuperstar'

export function fetchDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(result => {
            return JSON.parse(result)
        })
}

export function addDeck(key, deck) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: deck
    }))
}

export function removeDeck(key) {
    return fetchDecks().then(results => {
        results[key] = undefined
        delete results[key]
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(results))
    })
}

export function addCard(key, card) {
    return fetchDecks().then(results => {
        deck = results[key]
        deck.questions.push(card)
        return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
            [key]: deck
        }))
    })

}
