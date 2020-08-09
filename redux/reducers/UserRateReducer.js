import { GET_USER_RATES, GET_USER_RATES_SUCCESS, GET_USER_RATES_FAILURE } from "../actions/UserRateAction";


const initState = {
    loading: false,
    data: {}, // map { appId: [list user rate] }
    list: [],
    perfectest: [],
    error: null,
}

const userRateReducer = (state = initState, action) => {
    //console.log(' action ', action)
    switch(action.type) {
        case GET_USER_RATES:
            return {...state, loading : true };
        case GET_USER_RATES_FAILURE:
            return {...state, loading : false };
        case GET_USER_RATES_SUCCESS:
            let map = {};
            if(action.data){
                action.data.forEach((userRate) => {
                    if(!map[userRate.appId]) {
                        map[userRate.appId] = [];
                    }
                    map[userRate.appId].push(userRate);
                });
            }
            return {...state, loading : false, data : map};
      default:
        return state;
    }
  };
  
  export default userRateReducer
  