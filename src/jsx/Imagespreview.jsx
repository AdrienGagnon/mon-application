'use strict';

import { imageID } from '../img/photos-page';
import { photosArray } from '../img/photos-page';
console.log(imageID);
export default function Imagespreview() {
    // require(`../img/photos-page/amsterdam-canal.jpg`)
    return (
        <>
            {
                <>
                    {imageID.map(function (image) {
                        const img = photosArray[image.id];
                        return (
                            <div key={image.id} className="photo-container">
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
            }
        </>
    );
}
