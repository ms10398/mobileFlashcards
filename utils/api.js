import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'secretsuperstar'

/**
 * Get all decks from storage
 * @returns {Object}
 */
export function fetchDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(result => {
            return JSON.parse(result)
        })
}

/**
 * Add a new deck
 * @param key
 * @param deck
 * @returns {*}
 */
export function addDeck(key, deck) {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [key]: deck
    }))
}

/**
 * Remove a deck
 * @param key
 */
export function removeDeck(key) {
    return fetchDecks().then(results => {
        results[key] = undefined
        delete results[key]
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(results))
    })
}

/**
 * Add card to a deck
 * @param key
 * @param card
 * @returns {Object}
 */
export function addCard(key, card) {
    return fetchDecks().then(results => {
        deck = results[key]
        deck.questions.push(card)
        return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
            [key]: deck
        }))
    })

}
