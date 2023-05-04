import cv from '../assets/pdf/CV_AG_avril_2023-prog.pdf';

import './Cv.css';

function Cv() {
    return (
        <div className="infos-section" id="cv-contact-infos">
            <h1>Curriculum vitæ & contacts</h1>
            <div className="cv-contact-infos">
                <div className="cv-container">
                    <button id="visionner-cv">Visionnez</button> ou{' '}
                    <a
                        id="telecharger-cv"
                        href={cv}
                        download="CV_Adrien_Gagnon"
                    >
                        téléchargez
                    </a>{' '}
                    mon CV ici.
                </div>
                <div className="contact-infos-container">
                    <p>Contactez-moi par</p>
                    <button id="envoi-email-button">e-mail!</button>
                </div>
            </div>
        </div>
    );
}

export default Cv;
