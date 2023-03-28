'use strict';

import React, { Component } from 'react';
import { imageID } from '../img/photos-page';
import { photosArray } from '../img/photos-page';

class Imagespreview extends Component {
    render() {
        let paysActuel = '';
        return (
            <>
                {imageID.map(image => {
                    const img = photosArray[image.id];
                    const title = paysActuel !== image.pays ? true : false;
                    paysActuel = image.pays;
                    return (
                        <div>
                            {title && (
                                <h1
                                    key={image.description}
                                    className="sidebar-pays-title"
                                >
                                    {image.pays}
                                </h1>
                            )}
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
                        </div>
                    );
                })}
            </>
        );
    }
}

export default Imagespreview;
