import { MapContainer, TileLayer, useMap } from 'react-leaflet/lib';

export default function Map() {
    const coords = [48.85591395627553, 2.339240864028423];
    return (
        <MapContainer center={coords} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}
