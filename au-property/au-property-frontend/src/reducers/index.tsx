import {UPDATE_LOCATION, UPDATE_MARKER} from "../actions/types";

const initialState = {
    position: {
        lat: 0,
        lon: 0
    },
    map: {
        markerLat: 0,
        markerLon: 0
    }
}

export default function reducers(state: {} = initialState, action: any) {
    switch (action.type) {
        case UPDATE_LOCATION:
            return {
                ...state,
                position: {
                    lat: action.payload.lat,
                    lon: action.payload.lon
                }
            }
        default:
            return state
    }
}