import { useState } from 'react';

import MapMarkers from './MapMarkers.jsx';
import MapPopups from './MapPopups.jsx';

function Markersandpopup() {
    const [imageSettings, setImageSettings] = useState({
        height: 0,
        zoomLevel: 500,
    });

    function getImageHeight(e) {
        props.updateHeight(e.target.height);
    }

    return (
        <>
            <MapMarkers state={props.state} />
            <MapPopups
                state={props.state}
                imageSettings={imageSettings}
                setImageSettings={setImageSettings}
                getImageHeight={getImageHeight}
            />
        </>
    );
}

export default Markersandpopup;
