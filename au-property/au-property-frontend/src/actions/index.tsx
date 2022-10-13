import {UPDATE_LOCATION, GET_LOCATION_DETAIL} from "./types"

export const updateLocation = (value: Object) => {
    return {
        type: UPDATE_LOCATION, payload: value
    };
};

export const getLocationDetail = (value: Object) => {
    return {
        type: GET_LOCATION_DETAIL, payload: value
    };
};