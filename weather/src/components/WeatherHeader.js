import React from "react";
import _ from 'lodash';
import locationAPI from "../apis/locationAPI";
import {Grid, Search, Label, Icon} from 'semantic-ui-react'

const initialState = {
    loading: false,
    results: [],
    value: '',
}

function Reducer(state, action) {
    switch (action.type) {
        case 'CLEAN_QUERY':
            return initialState
        case 'START_SEARCH':
            return {...state, loading: true, value: action.query}
        case 'FINISH_SEARCH':
            console.log(action)
            return {...state, loading: false, results: action.results}
        case 'UPDATE_SELECTION':
            return {...state, value: action.selection}

        default:
            throw new Error()
    }
}

const resultRenderer = ({city, country, latitude, longitude}) => {
    return (
        <Grid>
            <Grid.Row>
                <Label content={city}/>
            </Grid.Row>
            <Grid.Row>
                <Icon name='map'/>
                <span>{country}</span>
            </Grid.Row>
            <Grid.Row>
                <Icon name='map marker'/>
                <span>lat: {latitude.toFixed(2)}</span>
                <span>lon: {longitude.toFixed(2)}</span>
            </Grid.Row>
        </Grid>
    )
}

function WeatherHeader() {
    const [state, dispatch] = React.useReducer(Reducer, initialState)
    const {loading, results, value} = state

    const timeoutRef = React.useRef()
    const handleSearchChange = React.useCallback((e, data) => {
        clearTimeout(timeoutRef.current)
        dispatch({type: 'START_SEARCH', query: data.value})

        timeoutRef.current = setTimeout(() => {
            if (data.value.length === 0) {
                dispatch({type: 'CLEAN_QUERY'})
                return
            }

            // const re = new RegExp(_.escapeRegExp(data.value), 'i')
            // const isMatch = (result) => re.test(result.title)
            const response = locationAPI.get(`?namePrefix=${data.value}`).then(res => {
                console.log(res)
                dispatch({
                    type: 'FINISH_SEARCH',
                    results: res.data.data
                })
            });
        }, 1500)
    }, [])
    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    return (
        <Grid>
            <Grid.Column width={6}>
                <Search
                    loading={loading}
                    placeholder='Search...'
                    onResultSelect={(e, data) => {
                        console.log(data)
                        dispatch({type: 'UPDATE_SELECTION', selection: data.result.city})
                    }}
                    onSearchChange={handleSearchChange}
                    results={results}
                    value={value}
                    resultRenderer={resultRenderer}
                />
            </Grid.Column>
        </Grid>
    )
}

export default WeatherHeader