import updateZoomImage from '../utils/updateZoomImage.js';
import goToNext from '../utils/goToNext.js';

import next from './assets/next.png';
import { photosArray } from '../assets/index.js';

import { Popup } from 'react-leaflet/lib';

function MapPopups() {
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
                        onLoad={e => getImageHeight(e)}
                    />
                    <div className="img-map-zoom-container">
                        <div
                            className="img-map-zoom-in"
                            onClick={() =>
                                updateZoomImage(
                                    'in',
                                    [
                                        props.imageSettings,
                                        props.setImageSettings,
                                    ],
                                    props.updateHeight
                                )
                            }
                        >
                            +
                        </div>
                        <div
                            className="img-map-zoom-out"
                            onClick={() =>
                                updateZoomImage(
                                    'out',
                                    [
                                        props.imageSettings,
                                        props.setImageSettings,
                                    ],
                                    props.updateHeight
                                )
                            }
                        >
                            −
                        </div>
                    </div>
                    <div
                        onClick={e => goToNext('left', props.updateState)}
                        className="arrows-wrapper arrows-left"
                    >
                        <span className="arrow first-arrow next ">
                            <img src={next} alt="" />
                        </span>
                        <span className="arrow second-arrow next ">
                            <img src={next} alt="" />
                        </span>
                    </div>
                    <div
                        onClick={e => goToNext('right', props.updateState)}
                        className="arrows-wrapper arrows-right"
                    >
                        <span className="arrow first-arrow next ">
                            <img src={next} alt="" />
                        </span>
                        <span className="arrow second-arrow next ">
                            <img src={next} alt="" />
                        </span>
                    </div>
                </Popup>
            )}
        </>
    );
}

export default MapPopups;
