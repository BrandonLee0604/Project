import React from 'react';
import {Grid} from 'semantic-ui-react'
import WeatherHeader from './HeaderBackup';
import CurrentWeather from "./CurrentWeather";
import HourlyWeather from "./HourlyWeather";
import FiveDayWeather from "./EightDayWeather";

// import WeatherSearch from "./WeatherSearch";

class App extends React.Component {
    componentDidMount() {
        let loading = document.getElementById('i-loading')
        if(loading) {
            loading.setAttribute('class', 'i-loading-out')
            setTimeout(() => {
                loading.style.display = 'none'
            }, 1000)
        }
    }

    render() {
        return (
            <div className="ui-container">
                <WeatherHeader/>
                <Grid.Row>
                    <CurrentWeather/>
                </Grid.Row>
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <HourlyWeather/>
                        </Grid.Column>
                        <Grid.Column>
                            <FiveDayWeather/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default App;