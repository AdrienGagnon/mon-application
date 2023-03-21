'use strict';

import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';

import {
    MapContainer,
    Marker,
    TileLayer,
    useMap,
    Popup,
} from 'react-leaflet/lib';

import Imagespreview from './Imagespreview';
import { imageID, photosArray } from '../img/photos-page';
import { iconPointer } from '../img/photos-page/location-pointer.png';
import Map from './map';

function App() {
    const [activeImg, setActiveImg] = useState(null);

    // const coords = [48.85591395627553, 2.339240864028423];
    const coords = [52.37185989346697, 4.895886074989968];

    const myIcon = L.icon({
        iconUrl: require('../img/photos-page/location-pointer.png'),
        iconSize: [64, 64],
        iconAnchor: [32, 64],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
    });

    const removeActiveMarker = function (img) {};

    return (
        <>
            <div className="sidebar">
                <h1>Sélectionnez une photo</h1>
                <div className="content-sidebar">
                    <Imagespreview />
                </div>
            </div>
            <MapContainer center={coords} zoom={12}>
                <TileLayer
                    // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}"
                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    subdomains="abcd"
                    minZoom={0}
                    maxZoom={18}
                    ext="png"
                />
                {imageID.map(img => {
                    return (
                        (activeImg === null || activeImg.id !== img.id) && (
                            <Marker
                                key={img.id}
                                position={[img.coords[0], img.coords[1]]}
                                icon={myIcon}
                                eventHandlers={{
                                    click: e => {
                                        setActiveImg(img);
                                    },
                                }}
                            />
                        )
                    );
                })}
                {activeImg && (
                    <Popup
                        setView={activeImg.coords}
                        setZoom={2}
                        position={activeImg.coords}
                    >
                        <img
                            className="img-map"
                            src={photosArray[activeImg.id]}
                        />
                    </Popup>
                )}
            </MapContainer>
        </>
    );
}

// export default function MarkersAndPopups() {
//     return (
//         <>
//             {imageID.map(function (image) {
//                 const imgID = photosArray[image.id];
//                 return (
//                     <Marker key={image.id} position={image.coords}>
//                         <Popup key={image.id}>
//                             <img className="img-map" src={imgID} />
//                         </Popup>
//                     </Marker>
//                 );
//             })}
//         </>
//     );
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
