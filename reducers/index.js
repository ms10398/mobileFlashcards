import { FETCH_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions/ActionTypes'

function decks(state = {}, action) {
    var newState = {}
    switch (action.type) {
        case FETCH_DECKS:
            return { ...action.decks }
        case ADD_DECK:
            return { ...state, [action.key]: action.deck }
        case REMOVE_DECK:
            newState = { ...state }
            newState[action.keyDeck] = undefined
            delete newState[action.keyDeck]
            return newState
        case ADD_CARD:
            newState = { ...state }
            newState[action.key].questions.push(action.card)
            return newState
        default :
            return state
    }
}

export default decks