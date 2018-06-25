import {
    FETCH_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_CARD
} from './ActionTypes'

export function fetchDecks(decks) {
    return {
        type: FETCH_DECKS,
        decks
    }
}

export function addDeck(key, deck) {
    return {
        type: ADD_DECK,
        key,
        deck,
    }
}

export function removeDeck(keyDeck) {
    return {
        type: REMOVE_DECK,
        keyDeck,
    }
}

export function addCard(key, card) {
    return {
        type: ADD_CARD,
        key,
        card,
    }
}