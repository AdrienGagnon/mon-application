import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import './AfficherSujetLieuGeo.css';

// Si sujet lieu-geo, affiche carte avec marqueur du pays et le titre
function AfficherSujetLieuGeo(props) {
    if (props.activeCountry === '') {
        return;
    }
    return (
        <div className="question-lieu-geo-container">
            <MapContainer
                center={props.activeCountry.latlng}
                zoom={6}
                scrollWheelZoom={true}
                whenReady={props.setMap}
                maxBoundsViscosity={0.6}
                minZoom={4}
            >
                <TileLayer
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}"
                    subdomains="abcd"
                    minZoom={2}
                    maxZoom={18}
                    ext="png"
                />
                <Marker position={props.activeCountry.latlng}></Marker>
            </MapContainer>
        </div>
    );
}

export default AfficherSujetLieuGeo;
