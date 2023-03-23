import React, { Component } from 'react';

import { imageID } from '../img/photos-page';
import { photosArray } from '../img/photos-page';

import { Marker } from 'react-leaflet/lib';
import { Marker, Popup } from 'react-leaflet/lib';

class MarksAndPops extends Component {
    render() {
        const myIcon = L.icon({
            iconUrl: require('../img/photos-page/location-pointer.png'),
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
                    return (
                        (this.props.state.activeImg === null ||
                            this.props.state.activeImg.id !== img.id) && (
                            <Marker
                                animate={true}
                                key={img.id}
                                position={[img.coords[0], img.coords[1]]}
                                icon={myIcon}
                                eventHandlers={{
                                    click: e => {
                                        this.props.updateState(img);
                                        this.props.state.map.flyTo(
                                            img.coords,
                                            this.props.state.map.getZoom(),
                                            {
                                                animate: true,
                                                duration: 1,
                                            }
                                        );
                                    },
                                }}
                            />
                        )
                    );
                })}
                {this.props.state.activeImg && (
                    <Popup
                        setView={this.props.state.activeImg.coords}
                        setZoom={2}
                        position={this.props.state.activeImg.coords}
                    >
                        <img
                            className="img-map"
                            src={photosArray[this.props.state.activeImg.id]}
                        />
                    </Popup>
                )}
            </>
        );
    }
}

export default MarksAndPops;
