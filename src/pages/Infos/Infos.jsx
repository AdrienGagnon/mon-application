import styles from './Infos.css';

import cv from './assets/pdf/CV_AG_avril_2023-prog.pdf';

import viewCV from './utils/viewCV';
import sendEmail from './utils/sendEmail';
import handleButtonPlus from './utils/handleButtonPlus';
import handleVideoMouseOver from './utils/handleVideoMouseOver';
import createScene from './utils/addScene';

import Resume from './components/Resume';
import Formation from './components/Formation';
import Competence from './components/Competence';
import Cv from './components/Cv';
import Loisirs from './components/Loisirs';
import VideoPiano from './components/VideoPiano';

import { useEffect } from 'react';

function InfosPage() {
    useEffect(() => {
        viewCV();
        sendEmail();
        handleButtonPlus();
        handleVideoMouseOver(); // can ajust for react
        createScene();
        window.scrollTo(0, 0);
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
                    <Resume />
                    <Formation />
                    <Competence />
                    <Cv />
                    <Loisirs />
                    <VideoPiano />
                </div>
            </div>
        </>
    );
}

export default InfosPage;
