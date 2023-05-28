import { TileLayer, MapContainer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { Point } from 'geojson';
import L from 'leaflet';

L.Marker.prototype.options.icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
});

// const center = { lat: 16.054407, lng: 108.202164 };
interface IPropsMap {
    center: {
        lat: number;
        lng: number;
    };
}
export default function Map({ center }: IPropsMap) {
    const geojsonData: Point = {
        type: 'Point',
        coordinates: [center.lng, center.lat],
    };

    return (
        <MapContainer style={{ height: '500px', width: '100%' }} center={center} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={geojsonData} style={{ fillColor: 'red', color: 'blue' }} />
        </MapContainer>
    );
}
