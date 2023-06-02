import { Link } from 'react-router-dom';

import amsterdam from '../../assets/section-2-preview/amsterdam-canal.jpg';
import corniglia from '../../assets/section-2-preview/Corniglia-maisons.jpg';
import santaMaria from '../../assets/section-2-preview/Florence-Santa-Maria-del-Fiore.jpg';
import treCime from '../../assets/section-2-preview/Tre-Cime-Di-Lavaredo-north.jpg';
import reactLogo from '../../assets/react.png';

function PhotosCard() {
    return (
        <>
            <div className="half-content-container">
                <div className="section-description  section3-description">
                    <h3>Des clichés d'Europe</h3>
                    <p>
                        Une petite application servant d'album photo de mes
                        voyages.
                    </p>
                    <Link to="/photos" className="link-contact">
                        Cliquez ici
                    </Link>
                    <div className="background-1"></div>
                    <div className="background-2"></div>
                </div>
                <div className="imgs-preview">
                    <img className="img-preview-menu" src={amsterdam} alt="" />
                    <img className="img-preview-menu" src={corniglia} alt="" />
                    <img className="img-preview-menu" src={santaMaria} alt="" />
                    <img className="img-preview-menu" src={treCime} alt="" />
                </div>
            </div>
        </>
    );
}

export default PhotosCard;
