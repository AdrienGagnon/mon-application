'use strict';

import { imageID } from './photo-id';

export default function Imagespreview() {
    return (
        <div>
            {imageID.forEach(function (image) {
                const refImage = '../img/photos-page/';

                return (
                    <div className="photo-container">
                        <img
                            className="img-preview"
                            src={refImage + image.imgName}
                        />
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
        </div>
    );
}
