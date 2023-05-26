import { Link } from 'react-router-dom';

import amsterdam from '../../assets/section-2-preview/amsterdam-canal.jpg';
import corniglia from '../../assets/section-2-preview/Corniglia-maisons.jpg';
import santaMaria from '../../assets/section-2-preview/Florence-Santa-Maria-del-Fiore.jpg';
import treCime from '../../assets/section-2-preview/Tre-Cime-Di-Lavaredo-north.jpg';
import reactLogo from '../../assets/react.png';

import './Section2.css';

function Section2() {
    return (
        <section className="section" id="section2">
            <h2>Des clichés d'Europe</h2>
            <div className="contenu">
                <div className="section-description photo-description">
                    <p>
                        Une petite application servant d'album photo de mes
                        voyages.
                    </p>
                    <div>
                        <p>
                            <span>&#8594;</span> Créé avec{' '}
                            <a href="https://react.dev/">React</a>
                        </p>
                        <img className="react-logo" src={reactLogo} alt="" />
                    </div>
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
        </section>
    );
}

export default Section2;
