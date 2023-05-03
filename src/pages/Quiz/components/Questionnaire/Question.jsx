import React, { useState, useEffect, useContext, createContext } from 'react';

import randomCountry from './Data/randomCountry';
import Resultat from '../Resultats/Resultat';

import { QuizStateContext } from '../../Quiz';

import AfficherTitre from './Titre/AfficherTitre';
import AfficherSujetDrapeau from './Question/Drapeau/AfficherSujetDrapeau';
import AfficherSujetCapitale from './Question/Capitale/AfficherSujetCapitale';
import AfficherSujetLieuGeo from './Question/LieuGeo/AfficherSujetLieuGeo';

import AfficherEssais from './Statistiques/AfficherEssais';

import ModeAucun from './Reponse/AucunChoix/ModeAucun';
import ModeChoixReponse from './Reponse/Choix/ModeChoixReponse';

import ActiveCountry from './Data/ActiveCountry';
import randomCountry from './Data/randomCountry';

import ToMenuButton from './Buttons/ToMenuButton';
import ToResultatsButton from './Buttons/ToResultats';
import ToSuivantButton from './Buttons/ToSuivantButton';

import resetRepondre from './Logic/resetRepondre';

import './Question.css';

export const QuestionContext = createContext(null);

export default function Question() {
    const [activeCountry, setActiveCountry] = useState('');
    const [choices, setChoices] = useState([]);
    const [map, setMap] = useState(null);
    const [score, setScore] = useState({
        score: 0,
        currentQuestionNumber: 1,
        essais: 0,
    });
    const [input, setInput] = useState('');
    const [disableButton, setDisableButton] = useState({
        retour: false,
        suivant: false,
        resultats: false,
    });
    const [aucunResultat, setAucunResultat] = useState(false);
    const [mapBounds, setMapBounds] = useState([]);

    const quizContext = useContext(QuizStateContext);
    const {
        parametres: [parametres, setParametres],
        activePage: [activePage, setActivePage],
        activeState: [activeState, setActiveState],
        transitionState: [transitionState, setTransitionState],
    } = useContext(QuizStateContext);

    // Appelé au debut et a chaque fois que currentQuestionNumber augmente. appel la fonction pour fetch data
    useEffect(() => {
        if (activeState === 'Resultat') return;
        resetRepondre(
            setDisableButton,
            setActiveState,
            setInput,
            score,
            setScore
        );
        ActiveCountry(
            randomCountry(),
            parametres,
            setActiveCountry,
            setChoices,
            map,
            setMapBounds
        );
    }, [score.currentQuestionNumber]);

    // Appelé au début pour enlever la transition
    if (transitionState.transitionToQuiz) {
        setTimeout(() => {
            // Activate fade out
            const transition = document.querySelector(
                '.transition-shapes-container'
            );
            transition.classList.add('left');
            transition.classList.add('transition-out-left');
            setTimeout(() => {
                // Deactivate transition
                transition.classList.add('hidden-shapes');
                transition.classList.remove('transition-out-left');
                setTransitionState({
                    ...transitionState,
                    transitionToQuiz: false,
                });
            }, 2000);
        }, 1000);
    }

    return (
        <div className="question-page">
            <QuestionContext.Provider
                value={{
                    activeCountry: [activeCountry, setActiveCountry],
                    choices: [choices, setChoices],
                    map: [map, setMap],
                    score: [score, setScore],
                    input: [input, setInput],
                    disableButton: [disableButton, setDisableButton],
                    aucunResultat: [aucunResultat, setAucunResultat],
                    mapBounds: [mapBounds, setMapBounds],
                }}
            >
                {activeState === 'Resultat' ? (
                    <Resultat
                        disableButton={disableButton}
                        setDisableButton={setDisableButton}
                    />
                ) : (
                    <>
                        <div className="question-container">
                            <AfficherTitre
                                activeCountry={activeCountry}
                                quizContext={quizContext}
                            />
                            {parametres.sujet === 'au drapeau' && (
                                <AfficherSujetDrapeau
                                    activeCountry={activeCountry}
                                />
                            )}
                            {parametres.sujet === 'à la capitale' && (
                                <AfficherSujetCapitale
                                    activeCountry={activeCountry}
                                />
                            )}
                            {parametres.sujet === 'au lieu géographique' && (
                                <AfficherSujetLieuGeo
                                    activeCountry={activeCountry}
                                    setMap={setMap}
                                />
                            )}
                        </div>
                        <div className="reponse-container">
                            {parametres.mode === 'aucun choix' && (
                                <ModeAucun
                                    input={input}
                                    setInput={setInput}
                                    score={score}
                                    setScore={setScore}
                                    quizContext={quizContext}
                                    activeCountry={activeCountry}
                                />
                            )}
                            {parametres.mode === 'choix' && (
                                <ModeChoixReponse
                                    activeCountry={activeCountry}
                                    choices={choices}
                                    score={score}
                                    setScore={setScore}
                                    quizContext={quizContext}
                                />
                            )}
                            <div className="stats-question">
                                <div>Score: {score.score}</div>
                                <div className="nombre-essais">
                                    <AfficherEssais
                                        score={score}
                                        parametres={parametres}
                                    />
                                </div>
                                <div className="currentQuestionNumber">
                                    {score.currentQuestionNumber} /{' '}
                                    {parametres.nombre} questions
                                </div>
                            </div>
                        </div>
                        <div className="buttons-to-menu-resultats-container">
                            <ToResultatsButton
                                disableButton={disableButton}
                                setDisableButton={setDisableButton}
                                score={score}
                                setAucunResultat={setAucunResultat}
                                quizContext={quizContext}
                            />
                            {(activeState === 'repondreReussi' ||
                                activeState === 'repondreEchoue') && (
                                <ToSuivantButton
                                    disableButton={disableButton}
                                    setDisableButton={setDisableButton}
                                    score={score}
                                    setScore={setScore}
                                    setAucunResultat={setAucunResultat}
                                    quizContext={quizContext}
                                />
                            )}
                            <ToMenuButton
                                disableButton={disableButton}
                                setDisableButton={setDisableButton}
                                quizContext={quizContext}
                            />
                        </div>
                    </>
                )}
            </QuestionContext.Provider>
        </div>
    );
}
