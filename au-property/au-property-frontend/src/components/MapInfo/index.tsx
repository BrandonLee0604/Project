import React, {Component, useState} from "react";
import {connect, useSelector } from "react-redux";
import {MapContainer, Marker, TileLayer, GeoJSON, Popup, useMap, useMapEvent, LayerGroup } from 'react-leaflet';
import L, {LeafletMouseEvent, point, Map, geoJSON } from 'leaflet';
import {updateLocation} from "../../actions";
import MyMapComponent from "./MyMapComponent"

import {State} from '../../types'
import nswMap from '../../files/nsw-lga-boundaries.json'

function ChangeView({ center, zoom }: any) {
    console.log(center, zoom)
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function ChangeMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvent('click', (e: any) => {
        console.log(e.latlng)
        setPosition(e.latlng)
    })
    return position === null ? null : (
        <Marker position={position}>
            <Popup>New marker</Popup>
        </Marker>
    )
}


class MapInfo extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.onEachFeature = this.onEachFeature.bind(this);

        this.state = {
            prevLayerClicked: null
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(this.props)
            this.props.updateLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            })
        }, function (err) {
            console.log(err.code);
        }, {enableHighAccuracy: true})
    }

    highlightLayer(layer: any) {
        layer.setStyle({
            weight: 1,
            color: '#fff',
            dashArray: '',
            fillOpacity: 0.5,
            fillColor: 'yellow'
        });
    }


    onEachFeature(feature: any, layer: any) {
        layer.on('click', (e: any) => {
            console.log(this)
            if(this.state.prevLayerClicked === null) {
                this.highlightLayer(e.target)
                this.setState({ prevLayerClicked : e.target })
            }
            if(this.state.prevLayerClicked !== e.target) {
                this.highlightLayer(e.target)
                L.geoJSON().resetStyle(this.state.prevLayerClicked)
                this.setState({ prevLayerClicked : e.target })
            }

            // console.log(e.target.feature)
            let geoX = e.target.feature.properties.geo_point_2d[0]
            let geoY = e.target.feature.properties.geo_point_2d[1]
            let myPopup = L.popup()
                .setContent(e.target.feature.properties.abb_name)
                .setLatLng([geoX, geoY])
            e.target
                .unbindPopup()
                .bindPopup(myPopup)
                .openPopup();
            this.props.updateLocation({
                lat: geoX,
                lon: geoY
            })
        })

    }


    render() {
        return (
                <MapContainer center={[0, 0]} zoom={13} scrollWheelZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LayerGroup>
                        <GeoJSON
                            attribution='nsw-lga-boundaries'
                            data={nswMap}
                            onEachFeature = {this.onEachFeature}
                        />
                    </LayerGroup>
                    <Marker position={[this.props.latitude, this.props.longitude]}>
                        <Popup>
                            Your current position
                        </Popup>
                    </Marker>
                    <ChangeView center={[this.props.latitude, this.props.longitude]} zoom={13} />
                    {/*<ChangeMarker />*/}
                </MapContainer>
        );
    }
}

const mapStateToProps = (state: State ) => {
    return {
        longitude: state.position.lon,
        latitude: state.position.lat,
    };
};

export default connect(
    mapStateToProps, {updateLocation}
)(MapInfo);