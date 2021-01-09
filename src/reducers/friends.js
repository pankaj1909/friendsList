import * as actionType from "../actions/types";

const initialState = {
    error: false,
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case actionType.DATA_LOADED:
            return {
                ...state,
                friendsData: payload,
                friendsDataDuplicate: payload,
            };
        case actionType.DATA_UPDATED:
            return {
                ...state,
                friendsData: {...state.friendsData, ...payload},
            };
        case actionType.DATA_UPDATED_BOTH:
            return {
                ...state,
                friendsData: {...state.friendsData, ...payload},
                friendsDataDuplicate: {...state.friendsDataDuplicate, ...payload},
            };
        case actionType.DATA_ERROR:
            return {
                ...state,
                error: true,
            };
        default:
            return state
    }
}