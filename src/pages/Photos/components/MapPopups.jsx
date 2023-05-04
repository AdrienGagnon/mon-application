import NextArrows from './NextArrows.jsx';
import ImageZoom from './ImageZoom.jsx';

import './MapPopups.css';

import { photosArray } from '../assets/index.js';

import { Popup } from 'react-leaflet/lib';

function MapPopups(props) {
    return (
        <>
            {props.state.activeImg && (
                <Popup
                    className="popup-container"
                    setView={props.state.activeImg.coords}
                    setZoom={2}
                    position={props.state.activeImg.coords}
                    maxWidth={'auto'}
                >
                    <img
                        className="img-map"
                        src={photosArray[props.state.activeImg.id]}
                        onLoad={e => props.getImageHeight(e)}
                    />
                    <ImageZoom
                        imageSettings={props.imageSettings}
                        setImageSettings={props.setImageSettings}
                        updateHeight={props.updateHeight}
                    />
                    <NextArrows
                        state={props.state}
                        updateState={props.updateState}
                    />
                </Popup>
            )}
        </>
    );
}

export default MapPopups;
