import chemistry from '../assets/chemistry.jpg';
import webDev from '../assets/web-dev.jpg';

import './Resume.css';

function Resume() {
    return (
        <div className="infos-section" id="resume">
            <h1>Résumé</h1>
            <div className="resume-container">
                <p>
                    Originairement formé en <span>chimie</span>, je m’intéresse
                    à un futur en <span>programmation</span>. Je suis un{' '}
                    <span>développeur autodidacte</span> curieux d’apprendre et
                    prêt à m’adapter à un nouvel environnement. Mon{' '}
                    <span>efficacité</span> et mon{' '}
                    <span>attention aux détails</span> font de moi un{' '}
                    <span>atout</span> dans une équipe de développeurs.
                </p>
                <div>
                    <img src={chemistry} alt="web developement" />
                    <img src={webDev} alt="web developement" />
                </div>
            </div>
        </div>
    );
}

export default Resume;
