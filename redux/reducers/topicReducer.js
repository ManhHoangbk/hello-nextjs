import { LOADED_APP_INFO, LOADING_TOPIC, LOAD_TOPIC_SUCCESS } from "../actions/topicAction";

const initialState = {
    topic: null,
    topics : [],
    isLoadingTopic : false
  };
  
  
const appInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADED_APP_INFO:
          return {...state, topic : action.topic };
        case LOADING_TOPIC:
            return {...state, isLoadingTopic :true };
        case LOAD_TOPIC_SUCCESS:
                return {...state, isLoadingTopic :false, topics : action.topics };
      default:
        return state;
    }
  };
  
  export default appInfoReducer
  