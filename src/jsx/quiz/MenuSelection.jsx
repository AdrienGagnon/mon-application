'use strict';

import React, { Component, useState } from 'react';
import rotatingEarth from './rotating-earth.mp4';

export default function MenuSelection(props) {
    const [selectedParameters, setSelectedParameters] = useState({
        sujet: 'au drapeau',
        choixReponse: 'le nom du pays',
        mode: 'aucun choix',
        nombre: 10,
    });

    const handleSubmit = e => {
        const drapeauAucunChoix =
            selectedParameters.choixReponse === 'le drapeau' &&
            selectedParameters.mode === 'aucun choix';
        const sameSujet =
            (selectedParameters.choixReponse.includes('drapeau') &&
                selectedParameters.sujet.includes('drapeau')) ||
            (selectedParameters.choixReponse.includes('capitale') &&
                selectedParameters.sujet.includes('capitale'));
        selectedParameters.choixReponse === 'le drapeau' &&
            selectedParameters.choixReponse === 'le drapeau';
        if (sameSujet || drapeauAucunChoix) {
            handleToErrorSelection();
        } else {
            handleToModeQuiz();
        }
    };

    const handleToErrorSelection = () => {
        const messageErreur = document.querySelector(
            '.error-message-selection'
        );
        messageErreur.classList.remove('hidden-text-selection');
    };

    const handleToModeQuiz = () => {
        // remove error message if there is one
        const messageErreur = document.querySelector(
            '.error-message-selection'
        );
        messageErreur.classList.add('hidden-text-selection');

        // transition animation
        const transition = document.querySelector('.transition-shapes');
        const selection = document.querySelector(
            '.options-selection-container'
        );
        transition.classList.toggle('activated');
        selection.classList.toggle('activated');

        // letting the animation proceed
        setTimeout(() => {
            // set parameters state
            props.updateModeQuiz(
                selectedParameters.sujet,
                selectedParameters.choixReponse,
                selectedParameters.mode,
                selectedParameters.nombre
            );
            props.updateState('repondre');
            props.updatePage('Question');
            // transition to question page true
            props.updateTransition(true);
        }, 2000);
    };

    function handleOnChange(e) {
        setSelectedParameters({
            sujet:
                e.target.id === 'information'
                    ? e.target.value
                    : selectedParameters.sujet,
            choixReponse:
                e.target.id === 'reponse'
                    ? e.target.value
                    : selectedParameters.choixReponse,
            mode:
                e.target.id === 'mode'
                    ? e.target.value
                    : selectedParameters.mode,
            nombre:
                e.target.id === 'nombre'
                    ? e.target.value
                    : selectedParameters.nombre,
        });
    }

    return (
        <div className="menu-selection-page">
            <video className="earth-rotating-video" autoPlay muted loop>
                <source src={rotatingEarth} type="video/mp4"></source>
            </video>
            <div className="options-selection-container activated">
                <h1>Sélectionnez vos paramètres de quiz</h1>
                <p>Vous pourrez changer le style de question à tout moment</p>
                <div className="form-container-quiz">
                    <div className="form-choose-quiz">
                        {/* information donnee */}
                        <label htmlFor="information">Information donnée:</label>
                        <select
                            id="information"
                            name="information"
                            type="text"
                            onChange={e => handleOnChange(e)}
                            defaultValue={selectedParameters.sujet}
                        >
                            <option value="au drapeau">Drapeau</option>
                            <option value="à la capitale">Capitale</option>
                            <option value="au lieu géographique">
                                Lieu géographique
                            </option>
                        </select>

                        {/* information a donner */}
                        <label htmlFor="reponse">À répondre:</label>
                        <select
                            id="reponse"
                            name="reponse"
                            type="text"
                            onChange={e => handleOnChange(e)}
                            defaultValue={selectedParameters.choixReponse}
                        >
                            <option value="le nom du pays">Nom du pays</option>
                            <option value="la capitale">Capitale</option>
                            <option value="le drapeau">Drapeau</option>
                        </select>

                        {/* mode reponse */}
                        <label htmlFor="mode">Mode de réponse:</label>
                        <select
                            id="mode"
                            name="mode"
                            type="text"
                            onChange={e => handleOnChange(e)}
                            defaultValue={selectedParameters.mode}
                        >
                            <option value="choix">Choix de réponse</option>
                            <option value="aucun choix">
                                Aucun choix de réponse
                            </option>
                        </select>

                        {/* nombre de questions */}
                        <label htmlFor="nombre">Nombre de questions:</label>
                        <select
                            id="nombre"
                            name="nombre"
                            type="text"
                            onChange={e => handleOnChange(e)}
                            defaultValue={selectedParameters.nombre}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <p>Vous pourrez changer les paramètres à tout moment</p>
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
