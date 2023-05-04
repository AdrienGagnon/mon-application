import { Link } from 'react-router-dom';

import reactLogo from '../../assets/react.png';
import RotatingEarth from './Earth';

import './Section3.css';

import Section3Svg from './Section3Svg';

function Section3() {
    return (
        <section className="section" id="section3">
            <h2>Quiz de géographie</h2>
            <div className="section-contenu-container">
                <div className="contenu section3-contenu">
                    <RotatingEarth />
                    <div className="section-description section-description-infos">
                        <p>
                            Connaissez-vous bien votre{' '}
                            <span>planète bleue?</span> Voici un petit{' '}
                            <span>quiz</span> pour tester vos connaissances.
                        </p>
                        <Link to="/quiz" className="link-contact">
                            Cliquez ici pour commencer
                        </Link>
                    </div>
                </div>
                <div className="contenu section3-contenu section3-contenu-extra1 section-contenu-extra">
                    <div className="section-contenu-extra-container">
                        <span>&#8594;</span> Créé avec
                        <a href="https://react.dev/">React</a>
                        <img className="react-logo" src={reactLogo} alt="" />
                    </div>
                </div>
                <div className="contenu section3-contenu section3-contenu-extra2 section-contenu-extra">
                    <div className="section-contenu-extra-container">
                        <p>
                            <span>&#8594;</span> Fait appel à des{' '}
                            <span>APIs REST</span>
                        </p>
                    </div>
                </div>
            </div>
            <Section3Svg />
        </section>
    );
}

export default Section3;
