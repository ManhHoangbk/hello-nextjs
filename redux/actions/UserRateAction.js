export const GET_USER_RATES = "GET_USER_RATES";
export const GET_USER_RATES_SUCCESS = "GET_USER_RATES_SUCCESS";
export const GET_USER_RATES_FAILURE = "GET_USER_RATES_FAILURE";
import userRates from '../../datas/userRatePerfect.json'

export const getUserRateAction = (appId) => {
    return {
        type: GET_USER_RATES, 
        appId: appId,
    };
}

export const getUserRateSuccess = (userRate) => {
    return {
        type: GET_USER_RATES_SUCCESS, 
        data: userRates,
    };
}

export const getUserRateFailure = (error) => {
    return {
        type: GET_USER_RATES_FAILURE, 
        error: error,
    };
}


export const getUserRate = (appId, dispatch) => {
    dispatch(getUserRateAction(appId));
    let userRate = userRates.filter((e) => e.appId == appId)
    dispatch(getUserRateSuccess(userRate));
}