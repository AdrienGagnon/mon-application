import React, { createContext, useEffect, useState } from 'react';

import './Quiz.css';

import MenuSelection from './components/Menu/MenuSelection';
import Question from './components/Questionnaire/Question';
import TransitionScreen from './components/TransitionScreen';

import ToggleMenu from '../../components/ToggleMenu/ToggleMenu';

export const QuizStateContext = createContext(null);

function QuizApp() {
    const [activePage, setActivePage] = useState('MenuSelection');

    const [activeState, setActiveState] = useState('');

    const [parametres, setParametres] = useState({
        sujet: '',
        choixReponse: '',
        mode: '',
        nombre: 5,
    });

    const [transitionState, setTransitionState] = useState({
        transitionToQuiz: false,
        transitionToMenu: false,
        loaded: false,
        fadeOut: false,
    });

    useEffect(() => {
        document.body.classList = 'body-quiz';
    }, []);

    function handleToggleMenu(e) {
        e.target.closest('#menu-toggle').classList.toggle('open');
        document.querySelector('nav').classList.toggle('open');
    }

    return (
        <>
            <ToggleMenu handleToggleMenu={e => handleToggleMenu(e)} />
            <QuizStateContext.Provider
                value={{
                    parametres: [parametres, setParametres],
                    activePage: [activePage, setActivePage],
                    activeState: [activeState, setActiveState],
                    transitionState: [transitionState, setTransitionState],
                }}
            >
                <div className="quiz-container">
                    {activePage === 'MenuSelection' && <MenuSelection />}
                    <TransitionScreen />
                    {activePage === 'Question' && <Question />}
                </div>
            </QuizStateContext.Provider>
        </>
    );
}

export default QuizApp;
