import { imageID } from '../assets';
import locationPointer from '../assets/location-pointer.png';

import { Marker } from 'react-leaflet/lib';

function MapMarkers(props) {
    const myIcon = L.icon({
        iconUrl: locationPointer,
        iconSize: [64, 64],
        iconAnchor: [32, 64],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null,
    });

    return (
        <>
            {imageID.map(img => {
                return props.state.activeImg === null ||
                    props.state.activeImg.id !== img.id ? (
                    <Marker
                        animate={true}
                        key={img.id}
                        position={[img.coords[0], img.coords[1]]}
                        icon={myIcon}
                        eventHandlers={{
                            click: e => {
                                props.updateState(img);
                            },
                        }}
                    />
                ) : (
                    ''
                );
            })}
        </>
    );
}

export default MapMarkers;
