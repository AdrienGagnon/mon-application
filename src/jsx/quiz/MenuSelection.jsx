'use strict';

import React, { Component, useState } from 'react';
import rotatingEarth from './rotating-earth.mp4';

export default function MenuSelection(props) {
    const [transitionToQuiz, setTransitionToQuiz] = useState(false);

    const handleSubmit = e => {
        // get parameters state
        const sujet = document.querySelector('#information').value;
        const choixReponse = document.querySelector('#reponse').value;
        const mode = document.querySelector('#mode').value;
        if (sujet === choixReponse) {
            handleToErrorSelection();
        } else {
            handleToModeQuiz(sujet, choixReponse, mode);
        }
    };

    const handleToErrorSelection = () => {
        const messageErreur = document.querySelector(
            '.error-message-selection'
        );
        messageErreur.classList.remove('hidden-text-selection');
    };

    const handleToModeQuiz = (sujet, choixReponse, mode) => {
        // remove error message if there is one
        const messageErreur = document.querySelector(
            '.error-message-selection'
        );
        messageErreur.classList.add('hidden-text-selection');

        // set parameters state
        props.updateModeQuiz(sujet, choixReponse, mode);
        props.updateState('repondre');

        // transition to question page true
        setTransitionToQuiz(true);
    };

    if (transitionToQuiz) {
        const optionsSelectionContainer = document.querySelector(
            '.options-selection-container'
        );
        const earthRotatingVideo = document.querySelector(
            '.earth-rotating-video'
        );
        optionsSelectionContainer.classList.add(
            'hidden-options-selection-container'
        );
        earthRotatingVideo.classList.add('menuSelectionTransistion');
        setTimeout(() => {
            props.updatePage('Question');

            // transition to question page false
            setTransitionToQuiz(false);
        }, 2000);
    }

    return (
        <div className="menu-selection-page">
            <video className="earth-rotating-video" autoPlay muted loop>
                <source src={rotatingEarth} type="video/mp4"></source>
            </video>
            <div className="options-selection-container">
                <h1>Sélectionnez vos paramètres de quiz</h1>
                <p>Vous pourrez changer le style de question à tout moment</p>
                <div className="form-container-quiz">
                    <div className="form-choose-quiz">
                        {/* information donnee */}
                        <label htmlFor="information">Information donnée:</label>
                        <select id="information" name="information" type="text">
                            <option value="au drapeau">Drapeau</option>
                            <option value="à la capitale">Capitale</option>
                            <option value="au lieu géographique">
                                Lieu géographique
                            </option>
                        </select>

                        {/* information a donner */}
                        <label htmlFor="reponse">À répondre:</label>
                        <select id="reponse" name="reponse" type="text">
                            <option value="le nom du pays">Nom du pays</option>
                            <option value="la capitale">Capitale</option>
                            <option value="le drapeau">Drapeau</option>
                        </select>

                        {/* mode reponse */}
                        <label htmlFor="mode">Mode de réponse:</label>
                        <select id="mode" name="mode" type="text">
                            <option value="choix">Choix de réponse</option>
                            <option value="aucun choix">
                                Aucun choix de réponse
                            </option>
                        </select>
                    </div>
                    <p>
                        Vous pourrez changer le style de question à tout moment
                    </p>
                    <p className="error-message-selection hidden-text-selection">
                        Ces paramètres sont incompatibles. Veuillez en
                        sélectionner d'autres.
                    </p>
                    <button
                        className="submitQuizParameters"
                        type="button"
                        name="Commencer le quiz"
                        onClick={handleSubmit}
                    >
                        Commencer le quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
