import React from "react";
import { connect } from 'react-redux';
import {Grid, Search, Label, Icon} from 'semantic-ui-react'
import {finishSearch, cleanQuery, startSearch, updateSelection} from "../actions";
import locationAPI from "../apis/locationAPI";


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

class HeaderBackup extends React.Component {

    handleSearchChange = (e, data) => {
        this.props.startSearch(data.value)
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            locationAPI.get(`?namePrefix=${data.value}`).then(res => {
                // console.log(res)
                this.props.finishSearch(res.data.data)
            });
        }, 1500)
    }

    render() {
        return (
            <Grid>
                <Grid.Column width={6} style={{marginLeft: '20px'}}>
                    <Search
                        loading={this.props.loading}
                        placeholder='Search...'
                        onResultSelect={(e, data) => {
                            // console.log(data)
                            this.props.updateSelection(data.result)
                            // dispatch({type: 'UPDATE_SELECTION', selection: data.result.city})
                        }}
                        onSearchChange={this.handleSearchChange}
                        results={this.props.results}
                        value={this.props.value}
                        resultRenderer={resultRenderer}
                    />
                </Grid.Column>
                <Grid.Column width={6}>
                    <h2>Weather Forecast by City</h2>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return { value: state.search.value, results: state.search.results, loading: state.search.loading };
};

export default connect(
    mapStateToProps,
    { finishSearch, cleanQuery, startSearch, updateSelection }
)(HeaderBackup);
