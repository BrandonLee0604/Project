import React from "react";
import {connect} from "react-redux";
import {forecastWeatherAPI} from "../apis/weatherAPI";
import HourlyChart from "./HourlyChart";

class HourlyWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            xdata: [],
            ydata: [],
            xdesc: [],
            data: {}
        }
    }

    convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
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
            res=>{
                const hourlyData = res.data.hourly
                const timeZone = res.data.timezone
                const xaxis = hourlyData.map(data => {
                    const utcSeconds = data.dt;
                    var d = new Date(0);
                    d.setUTCSeconds(utcSeconds);
                    var hour = this.convertTZ(d, timeZone).getHours().toLocaleString()
                    var str;
                    if (hour > 12){
                        hour -= 12;
                        str = 'PM'
                    } else {
                        str = " AM";
                    }
                    return hour + str
                })
                const yaxis = hourlyData.map(data => {
                    return data.temp
                })
                const xdesc = hourlyData.map(data => {
                    return data.weather[0].description
                })
                // console.log(xdesc)
                this.setState({
                    xdata: xaxis.slice(0,24),
                    ydata: yaxis.slice(0,24),
                    xdesc: xdesc.slice(0,24)
                })
            }
        );
    }

    render() {
        return (
            <div className='panel'>
                <div className='panel-title'>
                    <h3>Hourly forecast</h3>
                </div>
                <div className='panel-body'>
                    <HourlyChart xdata={this.state.xdata} ydata={this.state.ydata} xdesc={this.state.xdesc} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        longitude: state.location.lon,
        latitude: state.location.lat,
        city: state.location.city,
        country: state.location.country
    };
};

export default connect(
    mapStateToProps
)(HourlyWeather);