import {DECREMENT_COUNTER, INCREMENT_COUNTER, LOADED_CATEGORY, ADD_CATEGORY} from '../actions/counterActions';
let initState = {
    value : 0,
    categories: []
}

const counterReducer = (state = initState, action) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {...state, value: state.value + 1};
        case DECREMENT_COUNTER:
            return {...state, value: state.value - 1};
        case LOADED_CATEGORY :
            return {...state, categories: action.categories}
        case ADD_CATEGORY :
            return {...state, categories: [...state.categories, action.category]}
        default:
            return {...state};
    }
};

export default counterReducer;