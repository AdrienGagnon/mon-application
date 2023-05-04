import { useState } from 'react';

import MapMarkers from './MapMarkers.jsx';
import MapPopups from './MapPopups.jsx';

function MapObjects(props) {
    const [imageSettings, setImageSettings] = useState({
        height: 0,
        zoomLevel: 500,
    });

    function getImageHeight(e) {
        props.updateHeight(e.target.height);
    }

    return (
        <>
            <MapMarkers
                state={props.state}
                updateState={props.updateState}
                mapInst={props.mapInst}
            />
            <MapPopups
                state={props.state}
                imageSettings={imageSettings}
                setImageSettings={setImageSettings}
                getImageHeight={getImageHeight}
                updateState={props.updateState}
                updateHeight={props.updateHeight}
            />
        </>
    );
}

export default MapObjects;
