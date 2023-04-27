import React, { Component } from 'react';

import { imageID } from '../../img/photos-page';
import { photosArray } from '../../img/photos-page';

import { Marker } from 'react-leaflet/lib';
import { Marker, Popup } from 'react-leaflet/lib';

import next from './next.png';

class MarksAndPops extends Component {
    state = {
        height: 0,
        zoomLevel: 500,
    };

    goToNext(direction) {
        let newImg =
            imageID[
                this.props.state.activeImg.id + (direction === 'left' ? -1 : 1)
            ];
        if (newImg === undefined) {
            if (direction === 'left') {
                newImg = imageID[imageID.length - 1];
            } else {
                newImg = imageID[0];
            }
        }

        // Set the new image as active
        this.props.updateState(newImg);
    }

    getImageHeight(e) {
        this.props.updateHeight(e.target.height);
    }

    zoomImage(direction) {
        const img = document.querySelector('.img-map');
        const possibleHeight = [200, 300, 400, 500, 600];
        const index = possibleHeight.indexOf(this.state.zoomLevel);
        let newZoomLevel;
        if (direction === 'in') {
            if (index === possibleHeight.length - 1) {
                return;
            }
            newZoomLevel = possibleHeight[index + 1];
        } else {
            if (index === 0) {
                return;
            }
            newZoomLevel = possibleHeight[index - 1];
        }
        this.setState(() => ({
            zoomLevel: newZoomLevel,
        }));
        img.style.height = newZoomLevel + 'px';
        this.props.updateHeight(newZoomLevel);
    }

    render() {
        const myIcon = L.icon({
            iconUrl: require('../../img/photos-page/location-pointer.png'),
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
                    return this.props.state.activeImg === null ||
                        this.props.state.activeImg.id !== img.id ? (
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
                    ) : (
                        ''
                    );
                })}
                {this.props.state.activeImg && (
                    <Popup
                        className="popup-container"
                        setView={this.props.state.activeImg.coords}
                        setZoom={2}
                        position={this.props.state.activeImg.coords}
                        maxWidth={'auto'}
                    >
                        <img
                            className="img-map"
                            src={photosArray[this.props.state.activeImg.id]}
                            onLoad={e => this.getImageHeight(e)}
                        />
                        <div className="img-map-zoom-container">
                            <div
                                className="img-map-zoom-in"
                                onClick={() => this.zoomImage('in')}
                            >
                                +
                            </div>
                            <div
                                className="img-map-zoom-out"
                                onClick={() => this.zoomImage('out')}
                            >
                                −
                            </div>
                        </div>
                        <div
                            onClick={e => this.goToNext('left')}
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
                            onClick={e => this.goToNext('right')}
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
}

export default MarksAndPops;
