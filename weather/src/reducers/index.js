import {FINISH_SEARCH, UPDATE_SELECTION, CLEAN_QUERY, START_SEARCH, UPDATE_LOCATION} from "../actions/types";

const initialState = {
    search: {
        loading: false,
        results: [],
        value: '',
        selection: ''
    },
    location: {
        lat: 0,
        lon: 0,
        city: '',
        country: ''
    }
}

export default function reducers(state = initialState, action) {
    switch (action.type) {
        case CLEAN_QUERY:
            return initialState
        case START_SEARCH:
            return {...state, search: {...state.search, loading: true, value: action.payload}}
        case FINISH_SEARCH:
            return {...state, search: {...state.search, loading: false, results: action.payload}}
        case UPDATE_SELECTION:
            return {
                ...state,
                search: {...state.search, value: action.payload.city},
                location: {
                    ...state.location,
                    lat: action.payload.latitude,
                    lon: action.payload.longitude,
                    city: action.payload.city,
                    country: action.payload.country
                }
            }
        case UPDATE_LOCATION:
            return {
                ...state,
                location: {
                    ...state.location,
                    lat: action.payload.lat,
                    lon: action.payload.lon
                }
            }

        default:
            return state
    }
}