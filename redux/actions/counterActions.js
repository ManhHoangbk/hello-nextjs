//Action Types
export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";
export const LOAD_CATEGORY = "LOAD_CATEGORY";
export const LOADED_CATEGORY = "LOADED_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";


//Action Creator
export const incrementCounter = () => ({
   type: INCREMENT_COUNTER
});

export const decrementCounter = () => ({
    type: DECREMENT_COUNTER
});

export const addCategory = () => ({
    type: ADD_CATEGORY,
    category: {id: Date.now, name : 'Đại học tổng hợp'}
})

export const loadedCategory = (categories) => ({
    type: LOADED_CATEGORY,
    categories: categories
})