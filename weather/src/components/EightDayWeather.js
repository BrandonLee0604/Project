import React from "react";
import {Image, Item, Grid} from 'semantic-ui-react'
import {forecastWeatherAPI} from "../apis/weatherAPI";
import {connect} from "react-redux";

class EightDayWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyList: [],
            timeZone: ''
        }
    }

    convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
    }

    convertDay(date){
        switch (date){
            case '1':
                return 'Mon'
            case '2':
                return 'Tue'
            case '3':
                return 'Wed'
            case '4':
                return 'Thu'
            case '5':
                return 'Fri'
            case '6':
                return 'Sat'
            case '0':
                return 'Sun'
            default:
                return date
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        forecastWeatherAPI({
            method: 'get',
            params: {
                lat: nextProps.latitude,
                lon: nextProps.longitude
            }
        }).then(
            res => {
                // console.log(res)
                this.setState({
                    dailyList: res.data.daily,
                    timeZone: res.data.timezone
                })
                // console.log(this.state)
            }
        )
    }

    renderList() {
        // console.log(this.state.dailyList)
        return this.state.dailyList.map(daily => {
            const utcSeconds = daily.dt;
            var d = new Date(0);
            d.setUTCSeconds(utcSeconds);
            var dateString = this.convertTZ(d, this.state.timeZone).toDateString()
            var day = dateString.split(" ")[0]
            var date = dateString.split(" ")[2] + ' ' + dateString.split(" ")[1]
            var minTemp = daily.temp.min.toFixed(0) + '°C'
            var maxTemp = daily.temp.max.toFixed(0) + '°C'
            var discription = daily.weather[0].description
            return (
                <Grid key={daily.dt} verticalAlign={"middle"}>
                    <Grid.Column width={6}>
                        <div className='date' style={{fontSize: '17px', fontWeight: '700'}}>
                            {day}, {date}
                        </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Grid verticalAlign={"middle"} divided>
                            <Grid.Column width={6} >
                                <Grid.Row verticalAlign={"middle"}>
                                    <div className='weather-icon'>
                                        <img src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`} />
                                        {minTemp}/{maxTemp}
                                    </div>
                                </Grid.Row>
                            </Grid.Column>
                            <Grid.Column width={10} style={{fontSize: '15px', fontWeight: '500'}}>
                                {discription}
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                </Grid>
            )
        })
    }

    render() {
        return (
            <div className='panel'>
                <div className='panel-title'>
                    <h3>8-day forecast</h3>
                </div>
                <div className='panel-body'>
                        {this.renderList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        longitude: state.location.lon,
        latitude: state.location.lat
    };
};

export default connect(
    mapStateToProps
)(EightDayWeather);