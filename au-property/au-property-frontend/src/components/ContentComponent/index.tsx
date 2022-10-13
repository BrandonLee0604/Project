import React, {Component} from "react";
import MapInfo from "../MapInfo";
// import '../../../node_modules/leaflet/dist/leaflet.css';

class ContentComponent extends Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state={
            lat: 0,
            lon: 0,
            markerLat: 0,
            markerLon: 0
        }
    }

    render() {
        return (
            <div id={"nsw-map-container"} style={{height: "1000px", width: "1000px"}}>
                <MapInfo />
            </div>
        );
    }
}
export default ContentComponent;