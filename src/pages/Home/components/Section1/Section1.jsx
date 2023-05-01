import { Link } from 'react-router-dom';

import photoFinissant from '../../assets/photo-finissant-zoom.jpg';
import CvImg from '../../assets/cv.png';
import threeLogo from '../../assets/threejs.png';

import './Section1.css';

import Section1Svg from './Section1Svg';

function Section1() {
    return (
        <section className="section" id="section1">
            <Section1Svg />
            <h2 className="header-2">En connaitre davantage sur moi</h2>
            <div className="section-contenu-container">
                <div className="contenu section1-contenu">
                    <img
                        className="img-section"
                        src={photoFinissant}
                        id="questionnement"
                    />
                    <div className="section-description section-description-infos">
                        <p>
                            Apprenez-en plus sur mon <span>parcours</span>, mes{' '}
                            <span>intérêts</span> et mes <span>ambitions</span>.
                        </p>
                        <Link to="/infos" className="link-contact">
                            Cliquez ici
                        </Link>
                    </div>
                </div>
                <div className="contenu section1-contenu section1-contenu-extra1 section-contenu-extra">
                    <div className="section-contenu-extra-container">
                        <p>
                            <span>&#8594;</span> Inclut une version PDF de mon
                            CV
                        </p>
                        <img src={CvImg} alt="" />
                    </div>
                </div>
                <div className="contenu section1-contenu section1-contenu-extra2 section-contenu-extra">
                    <div className="section-contenu-extra-container">
                        <p>
                            <span>&#8594;</span> Arrière-plan créé avec Three.js
                        </p>
                        <img src={threeLogo} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section1;
