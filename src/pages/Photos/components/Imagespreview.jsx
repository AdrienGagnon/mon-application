import React, { Component } from 'react';
import { imageID } from '../assets/index.js';
import { photosArray } from '../assets/index.js';

import './ImagesPreview.css';

class ImagesPreview extends Component {
    render() {
        let paysActuel = '';
        return (
            <>
                {imageID.map(image => {
                    const img = photosArray[image.id];
                    const title = paysActuel !== image.pays ? true : false;
                    paysActuel = image.pays;
                    return (
                        <div key={image.id}>
                            {title && (
                                <h1 className="sidebar-pays-title">
                                    {image.pays}
                                </h1>
                            )}
                            <div
                                ref={this.myRef}
                                className="photo-container"
                                onClick={() => {
                                    this.props.updateState(image);
                                    // this.props.flyToMarker(image.coords);
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

export default ImagesPreview;
