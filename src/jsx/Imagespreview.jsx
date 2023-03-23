'use strict';

import React, { Component } from 'react';
import { imageID } from '../img/photos-page';
import { photosArray } from '../img/photos-page';

class Imagespreview extends Component {
    render() {
        return (
            <>
                {imageID.map(image => {
                    const img = photosArray[image.id];
                    return (
                        <div
                            key={image.id}
                            className={`photo-container`}
                            onClick={() => {
                                this.props.updateState(image);
                                this.props.state.map.flyTo(
                                    image.coords,
                                    this.props.state.map.getZoom(),
                                    {
                                        animate: true,
                                        duration: 1,
                                    }
                                );
                            }}
                        >
                            <img className="img-preview" src={img} />
                            <div className="img-description">
                                <div className="img-lieu">
                                    <img
                                        className="icon-photo"
                                        src={require('../img/photos-page/icon-photo.png')}
                                        alt=""
                                    />
                                    {image.ville}, {image.pays}
                                </div>
                                {image.description}
                            </div>
                        </div>
                    );
                })}
            </>
        );
    }
}

export default Imagespreview;
