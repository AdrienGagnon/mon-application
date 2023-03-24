'use strict';

import React, { Component } from 'react';
import { imageID } from '../img/photos-page';
import { photosArray } from '../img/photos-page';

class Imagespreview extends Component {
    render() {
        return (
            <>
                {imageID.map((image, i) => {
                    const img = photosArray[image.id];
                    return (
                        <div
                            ref={this.myRef}
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
                            <div className="img-description-container">
                                <div className="img-description flow">
                                    <div className="img-lieu flow">
                                        {image.ville}, {image.pays}
                                    </div>
                                    <p className="card__description">
                                        {image.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    }
}

export default Imagespreview;
