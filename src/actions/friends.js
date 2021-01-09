import * as actionType from "./types";
import {friendsList} from "../static/Data";

export const loadFriendsData = () => dispatch => {
    try {
        dispatch({
            type: actionType.DATA_LOADED,
            payload: friendsList.data
        })
    } catch (e) {
        dispatch({
            type: actionType.DATA_ERROR,
        })
    }
}

export const updateFriendsData = (data, both) => dispatch => {
    try {
        if (both)
            dispatch({
                type: actionType.DATA_UPDATED_BOTH,
                payload: data
            })
        else
            dispatch({
                type: actionType.DATA_UPDATED,
                payload: data
            })
    } catch (e) {
        dispatch({
            type: actionType.DATA_ERROR,
        })
    }
}
