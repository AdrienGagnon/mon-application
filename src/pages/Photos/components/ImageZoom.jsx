import updateZoomImage from '../utils/updateZoomImage.js';
import './ImageZoom.css';

function ImageZoom(props) {
    const options = [
        { direction: 'in', sign: <span>&#43;</span> },
        { direction: 'out', sign: <span>&#8722;</span> },
    ];

    return (
        <div className="img-map-zoom-container">
            {options.map(option => {
                return (
                    <div
                        key={option.direction}
                        className={'img-map-zoom-' + option.direction}
                        onClick={() =>
                            updateZoomImage(
                                option.direction,
                                [props.imageSettings, props.setImageSettings],
                                props.updateHeight
                            )
                        }
                    >
                        {option.sign}
                    </div>
                );
            })}
        </div>
    );
}

export default ImageZoom;
