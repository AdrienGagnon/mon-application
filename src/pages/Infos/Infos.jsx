import styles from './Infos.css';

import badminton from './assets/badminton.jpg';
import chemistry from './assets/chemistry.jpg';
import fastForward from './assets/fast-forward.png';
import webDev from './assets/web-dev.jpg';
import piano from './assets/piano.jpg';

import cv from './assets/pdf/CV_AG_avril_2023-prog.pdf';

import viewCV from './components/viewCV';
import sendEmail from './components/sendEmail';
import handleButtonPlus from './components/handleButtonPlus';
import handleVideoMouseOver from './components/handleVideoMouseOver';
import createScene from './components/addScene';

import { useEffect } from 'react';

function InfosPage() {
    useEffect(() => {
        viewCV();
        sendEmail();
        handleButtonPlus();
        handleVideoMouseOver(); // can ajust for react
        createScene();
    }, []);

    document.body.classList = 'body-infos';

    return (
        <>
            <div id="body-infos" style={styles}>
                <iframe className="pdf-cv hidden-cv" src={cv}></iframe>
                <div className="loading-screen">
                    <div className="loading-screen-spin infos-spin"></div>
                </div>
                <button className="quit-cv-view hidden-cv">X</button>
                <div className="container-infos">
                    <div className="infos-section" id="resume">
                        <h1>Résumé</h1>
                        <div className="resume-container">
                            <p>
                                Originairement formé en <span>chimie</span>, je
                                m’intéresse à un futur en{' '}
                                <span>programmation</span>. Je suis un{' '}
                                <span>développeur autodidacte</span> curieux
                                d’apprendre et prêt à m’adapter à un nouvel
                                environnement. Mon <span>efficacité</span> et
                                mon <span>attention aux détails</span> font de
                                moi un <span>atout</span> dans une équipe de
                                développeurs.
                            </p>
                            <div>
                                <img src={chemistry} alt="web developement" />
                                <img src={webDev} alt="web developement" />
                            </div>
                        </div>
                    </div>
                    <div className="infos-section" id="formation">
                        <h1>Formation</h1>
                        <ul className="formation-description">
                            <div className="etude">
                                <p>Baccalauréat en chimie</p>
                                <p>2019-2022</p>
                                <p>Régime coopératif</p>
                                <p>Université de Sherbrooke</p>
                            </div>
                            <div className="etude">
                                <p>Diplôme d’études collégiales</p>
                                <p>2017-2019</p>
                                <p>Sciences, Lettres et Arts</p>
                                <p>Cégep de Sherbrooke</p>
                            </div>
                        </ul>
                        <h2>Expériences de travail</h2>
                        <ul className="experiences">
                            <div className="experience-un">
                                <div>
                                    <img
                                        className="fast-forward-arrow"
                                        src={fastForward}
                                        alt=""
                                    />
                                    Stagiaire en recherche
                                </div>
                                <p>Été 2022</p>
                                <p>
                                    Recherche sur les protéines Fur dans des
                                    bactéries E. Coli.
                                </p>
                                <p>
                                    Commissariat à l’Énergie Atomique, Grenoble,
                                    France
                                </p>
                            </div>
                            <div className="experience">
                                <div>
                                    <img
                                        className="fast-forward-arrow"
                                        src={fastForward}
                                        alt=""
                                    />
                                    Stagiaire en recherche en chimie organique
                                </div>
                                <p>Hiver 2021</p>
                                <p>
                                    Synthèse, purification et analyse de
                                    diverses molécules complexes.
                                </p>
                                <p>OmegaChem, Lévis</p>
                            </div>
                            <div className="experience">
                                <div>
                                    <img
                                        className="fast-forward-arrow"
                                        src={fastForward}
                                        alt=""
                                    />
                                    Stagiaire en synthèse de peptides
                                </div>
                                <p>Automne 2021</p>
                                <p>
                                    Synthèse de peptides avec un synthétiseur
                                    automatique Symphony-X.
                                </p>
                                <p>
                                    Institut de pharmacologie de Sherbrooke
                                    (IPS)
                                </p>
                            </div>
                            <div className="experience">
                                <div>
                                    <img
                                        className="fast-forward-arrow"
                                        src={fastForward}
                                        alt=""
                                    />
                                    Stagiaire en électrochimie
                                </div>
                                <p>Été 2020</p>
                                <p>
                                    Optimisation d’une synthèse de matériaux
                                    cathodiques de type NMC et assemblage de
                                    piles boutons pour évaluer les performances
                                    du matériau.
                                </p>
                                <p>
                                    Laboratoire de la Pre. Gessie Brisard,
                                    Université de Sherbrooke
                                </p>
                            </div>
                            <button className="button-plus">Plus</button>
                        </ul>
                    </div>
                    <div className="infos-section">
                        <h1>Compétences</h1>
                        <div className="competences">
                            <div className="langages">
                                <h2>Langages maîtrisés</h2>
                                <div className="block">
                                    <div className="langage">Python</div>
                                    <div className="langage">JavaScript</div>
                                    <div className="langage">HTML</div>
                                    <div className="langage">CSS</div>
                                </div>
                            </div>
                            <div className="outils">
                                <h2>Outils utilisés</h2>
                                <div className="block">
                                    <div className="outil">GitHub</div>
                                    <div className="outil">VS Code</div>
                                </div>
                            </div>
                            <div className="concepts-autres">
                                <h2>Autres concepts familiers</h2>
                                <div className="block">
                                    <div className="concept">React</div>
                                    <div className="concept">Three.js</div>
                                    <div className="concept">AJAX</div>
                                    <div className="concept">Node.js</div>
                                </div>
                            </div>
                        </div>
                        <div className="langues">
                            <div className="langue">
                                <h2>Français:</h2>
                                <div className="cercles-langues"></div>
                            </div>
                            <div className="langue">
                                <h2>Anglais:</h2>
                                <div className="cercles-langues anglais"></div>
                            </div>
                        </div>
                    </div>
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
                    <div className="infos-section">
                        <h1>Loisirs</h1>
                        <div className="section-loisir badminton">
                            <p>
                                J'aime faire du <span>sport</span>, en
                                particulier le <span>badminton</span>. J'ai fait
                                de la <span>compétition</span> pendant
                                longtemps, notamment avec les Volontaires du
                                Cégep de Sherbrooke.
                            </p>
                            <img src={badminton} alt="" />
                        </div>
                        <div className="section-loisir piano">
                            <p>
                                Je joue du <span>piano</span> depuis que j'ai 10
                                ans. Ci-dessous, vous pourrez écouter une petite{' '}
                                <span>création</span> pour un projet de Cégep et
                                deux <span>interprétations</span> de pièces de
                                Ravel et de Rachmaninoff.
                            </p>
                            <img src={piano} alt="" />
                        </div>
                    </div>
                    <div className="videos-piano-container">
                        <div className="video-piano" id="video-ambiance">
                            <iframe
                                src="https://www.youtube.com/embed/9NryGfikwlA"
                                title="Ambiance"
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="video-piano" id="video-gaspard">
                            <iframe
                                src="https://www.youtube.com/embed/WFdy4j1IV34"
                                title="Ondine"
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="video-piano" id="video-rach">
                            <iframe
                                src="https://www.youtube.com/embed/51sWBYVdGbs"
                                title="Ondine"
                                frameBorder="0"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfosPage;
