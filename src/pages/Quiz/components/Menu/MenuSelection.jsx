import React, { useContext, useState } from 'react';
import rotatingEarth from '../../assets/rotating-earth.mp4';

import handleVideoLoaded from './handleVideoLoaded';

import FormParameters from './formParameters';

import { QuizStateContext } from '../../Quiz';

import './MenuSelection.css';

export default function MenuSelection() {
    const [selectedParameters, setSelectedParameters] = useState({
        sujet: 'au drapeau',
        choixReponse: 'le nom du pays',
        mode: 'choix',
        nombre: 5,
    });

    const {
        transitionState: [transitionState, setTransitionState],
    } = useContext(QuizStateContext);
    const quizContext = useContext(QuizStateContext);

    // Appelé au début pour enlever la transition
    if (transitionState?.transitionToMenu) {
        setTimeout(() => {
            // Activate fade out
            const transition = document.querySelector(
                '.transition-shapes-container'
            );
            transition.classList.add('right');
            transition.classList.add('transition-out-right');
            setTimeout(() => {
                // Deactivate transition
                transition.classList.add('hidden-shapes');
                transition.classList.remove('transition-out-right');

                // props.updateTransitionMenu(false); wrong one?
                setTransitionState({
                    ...transitionState,
                    transitionToMenu: false,
                });
            }, 2000);
        }, 1000);
    }

    return (
        <div className="menu-selection-page">
            <video
                className="earth-rotating-video"
                autoPlay
                muted
                loop
                onLoadedData={() =>
                    handleVideoLoaded(transitionState, setTransitionState)
                }
            >
                <source src={rotatingEarth} type="video/mp4"></source>
            </video>
            {!transitionState.loaded && (
                <div
                    className={
                        'loading-screen ' +
                        (transitionState.fadeOut ? 'fade-out' : '')
                    }
                >
                    <div className="loading-screen-spin quiz-spin"></div>
                </div>
            )}
            <div className="options-selection-container">
                <h1>Sélectionnez vos paramètres de quiz</h1>
                <p>Vous pourrez changer le style de question à tout moment</p>
                <FormParameters
                    quizContext={quizContext}
                    selectedParameters={selectedParameters}
                    setSelectedParameters={setSelectedParameters}
                />
            </div>
        </div>
    );
}
