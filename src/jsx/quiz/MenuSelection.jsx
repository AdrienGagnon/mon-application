'use strict';

import React, { Component, useState } from 'react';
import rotatingEarth from './rotating-earth.mp4';

export default function MenuSelection(props) {
    const handleSubmit = e => {
        // get answers
        const sujet = document.querySelector('#information');
        const choixReponse = document.querySelector('#reponse');
        const mode = document.querySelector('#mode');

        // set answers
        props.updateModeQuiz([sujet, choixReponse, mode]);

        // transition to question page
        props.updateState('Question');
    };

    if (props.transition) {
        const menuSelectionPage = document.querySelector(
            '.menu-selection-page'
        );
        const earthRotatingVideo = document.querySelector(
            '.earth-rotating-video'
        );
        // menuSelectionPage.classList.add('menuSelectionTransistion');
        earthRotatingVideo.classList.add('menuSelectionTransistion');
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
                        <label htmlFor="information">Information donnée:</label>
                        <select id="information" name="information" type="text">
                            <option value="drapeau">Drapeau</option>
                            <option value="capitale">Capitale</option>
                            <option value="lieu-geo">Lieu géographique</option>
                        </select>
                        <label htmlFor="reponse">À répondre:</label>
                        <select id="reponse" name="reponse" type="text">
                            <option value="le nom du pays">Nom du pays</option>
                            <option value="la capitale">Capitale</option>
                            <option value="le drapeau">Drapeau</option>
                        </select>
                        <label htmlFor="mode">Mode de réponse:</label>
                        <select id="mode" name="mode" type="text">
                            <option value="choix">Choix de réponse</option>
                            <option value="aucun choix">
                                Aucun choix de réponse
                            </option>
                        </select>
                    </div>
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
