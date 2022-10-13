import {MapContainer, Marker, TileLayer, GeoJSON, Popup, useMapEvents } from 'react-leaflet';
import {useState} from "react";

function MyMapComponent() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e: any) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default MyMapComponent