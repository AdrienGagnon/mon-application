'use strict';

import React, { useState, useEffect, useRef } from 'react';
import randomCountry from './randomCountry';
import Resultat from './Resultat';

export default function Question(props) {
    const [activeCountry, setActiveCountry] = useState('');
    const [otherChoices, setOtherChoices] = useState([]);
    const [shuffleState, setShuffleState] = useState(false);
    const [score, setScore] = useState({
        score: 0,
        currentQuestionNumber: 1,
        essais: 0,
    });
    const [input, setInput] = useState('');

    // Compare reponse et input, mene soit a reussi ou rate
    function handleReponse() {
        const inputReponse = input
            .toLowerCase()
            .replace('é', 'e')
            .replace(/\s+/g, '');
        const bonneReponse = genereBonneReponse();
        if (bonneReponse.includes(inputReponse)) {
            updateStateReussi();
        } else {
            updateStateRate();
        }
    }

    function updateStateReussi() {
        props.updateState('repondreReussi');
        addScorePoint();
    }

    function updateStateRate() {
        setScore({
            score: score.score,
            currentQuestionNumber: score.currentQuestionNumber,
            essais: score.essais + 1,
        });
        // Si les essais sont finis, change le state
        if (score.essais === 4) {
            props.updateState('repondreEchoue');
        } else {
            props.updateState('repondreRate');
        }
    }

    function handleChoixReponse(e) {
        if (e.target.classList[1] === 'bonne-reponse-choix') {
            updateStateReussi();
        } else {
            updateStateRate();
        }
    }

    // Set activeCountry appelé par useEffect.
    async function setActiveCountryFunction(country) {
        const countryInfo = await fetchCountryData(country);
        props.state.mode === 'choix' && setOtherCountriesFunction(countryInfo);

        setActiveCountry(countryInfo);
    }

    // Set otherCountries appelé par useEffect.
    async function setOtherCountriesFunction(countryInfo) {
        let randomCountries = [];
        // Making sure the answer and the other choices are different
        while (true) {
            const bonneReponse = countryInfo.name.common;
            randomCountries = [randomCountry(), randomCountry()];
            if (!randomCountries.includes(bonneReponse)) {
                break;
            }
        }

        // fetch the other 2 choices
        const choix2Mauvais = await fetchCountryData(randomCountries[0]);
        const choix3Mauvais = await fetchCountryData(randomCountries[1]);

        setOtherChoices([choix2Mauvais, choix3Mauvais]);
    }

    // fetch info sur le pays.
    async function fetchCountryData(country) {
        try {
            const countryInfoJSON = await fetch(
                `https://restcountries.com/v3.1/name/${country}`
            );
            const [countryInfo] = await countryInfoJSON.json();
            console.log(countryInfo);
            return countryInfo;
        } catch (error) {
            console.log(error);
        }
    }

    // Appelé au debut et a chaque fois que currentQuestionNumber augmente. appel la fonction pour fetch data
    useEffect(() => {
        setShuffleState(false);
        resetRepondre();
        setActiveCountryFunction(randomCountry());
    }, [score.currentQuestionNumber]);

    // useEffect appel cette fonction pour reseter le state, input et nombre d'essais
    function resetRepondre() {
        // changer state repondre
        props.updateState('repondre');
        // clear input
        setInput('');
        // remettre a 0 les try
        setScore({
            score: score.score,
            currentQuestionNumber: score.currentQuestionNumber,
            essais: 0,
        });
    }

    function genereBonneReponse() {
        return [
            activeCountry.translations.fra.official
                .replace(/\s+/g, '')
                .toLowerCase()
                .replace('é', 'e'),
            activeCountry.translations.fra.common
                .replace(/\s+/g, '')
                .toLowerCase()
                .replace('é', 'e'),
        ];
    }

    // Affiche la bonne reponse quand les essais sont ecoules ou la bonne reponse est donnee
    function reponseActuelle() {
        return (
            <div
                className={
                    'reponse-actuelle ' +
                    (props.state.activeState === 'repondreReussi'
                        ? 'bonne-reponse-text'
                        : 'mauvaise-reponse-text')
                }
            >
                <strong>
                    {' '}
                    {props.state.activeState === 'repondreReussi' ? (
                        <>
                            <div className="checkmark"></div> Bien joué!
                        </>
                    ) : (
                        <>
                            <div className="crossmark"></div> Dommage!
                        </>
                    )}
                </strong>{' '}
                La bonne réponse était:{' '}
                <span> {activeCountry.translations.fra.common}</span>
            </div>
        );
    }

    // Si sujet drapeau, affiche svg du drapeau et le titre
    function sujetDrapeau() {
        function verbeCommence() {
            if (props.state.mode === 'aucun choix') {
                return 'Écrivez';
            }
            if (props.state.mode === 'choix') {
                return 'Sélectionnez';
            }
        }

        if (activeCountry === '') {
            return;
        }

        return (
            <>
                <h1 className="question-title">
                    {verbeCommence()} le {props.state.choixReponse}{' '}
                    correspondant {props.state.sujet}
                </h1>
                {(props.state.activeState === 'repondreReussi' ||
                    props.state.activeState === 'repondreEchoue') &&
                    reponseActuelle()}
                <div className="question-drapeau-container">
                    <img
                        className="question-drapeau"
                        src={activeCountry.flags.svg}
                        alt=""
                    />
                </div>
            </>
        );
    }

    // Augmente le score de un point si la reponse est bonne. Appelé par bonneReponse
    function addScorePoint() {
        setScore({
            score: score.score + 1,
            currentQuestionNumber: score.currentQuestionNumber,
            essais: score.essais,
        });
    }

    // Si on doit taper nous meme la reponse
    function modeAucun() {
        return (
            <div className="type-reponse-container">
                {(props.state.activeState === 'repondreRate' ||
                    props.state.activeState === 'repondreEchoue') && (
                    <div className="mauvaise-reponse-text reponse-text">
                        Mauvaise réponse!
                    </div>
                )}
                {props.state.activeState === 'repondreReussi' && (
                    <div className="bonne-reponse-text reponse-text">
                        Bonne réponse!
                    </div>
                )}
                <input
                    className="reponseQuestion"
                    type="text"
                    placeholder="Votre réponse"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={
                        props.state.activeState === 'repondreReussi' ||
                        props.state.activeState === 'repondreEchoue'
                    }
                />
                {props.state.activeState !== 'repondreReussi' &&
                    props.state.activeState !== 'repondreEchoue' && (
                        <button
                            className="submitReponse"
                            type="button"
                            name="Soumettre la reponse"
                            onClick={handleReponse}
                            disabled={!input}
                        >
                            Soumettre
                        </button>
                    )}
            </div>
        );
    }

    // Choix de reponse (3)
    function modeChoixReponse() {
        if (
            activeCountry === '' ||
            otherChoices === undefined ||
            otherChoices === [] ||
            otherChoices[0] === undefined ||
            otherChoices[1] === undefined
        ) {
            return;
        }

        const choix = [activeCountry, otherChoices[0], otherChoices[1]];
        const choixShuffle = choix.slice();

        // if (!shuffleState) {
        //     const shuffleArray = array => {
        //         for (let i = array.length - 1; i > 0; i--) {
        //             const j = Math.floor(Math.random() * (i + 1));
        //             const temp = array[i];
        //             array[i] = array[j];
        //             array[j] = temp;
        //         }
        //     };

        //     shuffleArray(choixShuffle);
        //     setShuffleState(choixShuffle);
        //     return;
        // }
        // Trouver index de la bonne reponse
        const indexBonneReponse = choixShuffle.indexOf(activeCountry);

        return (
            <div className="choix-reponse-container">
                {choixContent(choixShuffle, indexBonneReponse)}
            </div>
        );
    }

    function choixContent(choixShuffle, indexBonneReponse) {
        return choixShuffle.map((choix, index) => {
            let content;
            if (props.state.choixReponse === 'au nom du pays') {
                content = choix.translations.fra.common;
            }
            if (props.state.choixReponse === 'à la capitale') {
                content = choix.capital;
            }
            if (props.state.choixReponse === 'au drapeau') {
                content = choix.flags.svg;
            }
            return (
                <button
                    key={index}
                    className={
                        'choix ' +
                        (index === indexBonneReponse
                            ? 'bonne-reponse-choix '
                            : 'mauvaise-reponse-choix ') +
                        (props.state.activeState === 'repondreReussi' ||
                        props.state.activeState === 'repondreEchoue'
                            ? 'choix-resultat-montrer'
                            : '')
                    }
                    onClick={e => handleChoixReponse(e)}
                    disabled={
                        props.state.activeState === 'repondreReussi' ||
                        props.state.activeState === 'repondreEchoue'
                    }
                >
                    {content}
                </button>
            );
        });
    }

    // augmente la question actuelle de 1. déclenche useEffect
    function handleSuivant() {
        const reponseActuelle = document.querySelector('.reponse-actuelle');
        reponseActuelle.classList.toggle('slideOut');
        setTimeout(() => {
            setScore({
                score: score.score,
                currentQuestionNumber: score.currentQuestionNumber + 1,
                essais: score.essais,
            });
            reponseActuelle.classList.toggle('slideOut');

            if (score.currentQuestionNumber === 5) {
                props.updateState('Resultat');
                props.updatePage('Resultat');
            }
        }, 700);
    }

    // permet de peser sur enter pour soumettre la reponse
    function handleKeyDown(e) {
        if (e.key.toLowerCase() === 'enter') {
            handleReponse();
        }
    }

    return (
        <div className="question-page">
            {props.state.activeState === 'Resultat' ? (
                <Resultat />
            ) : (
                <>
                    {' '}
                    <div className="question-container">
                        {props.state.sujet === 'drapeau' && sujetDrapeau()}
                    </div>
                    <div className="reponse-container">
                        {props.state.mode === 'aucun choix' && modeAucun()}
                        {props.state.mode === 'choix' && modeChoixReponse()}
                        <div className="stats-question">
                            <div>Score: {score.score}</div>
                            <div className="nombre-essais">
                                {score.essais} / 5 essais
                            </div>
                            <div className="currentQuestionNumber">
                                {score.currentQuestionNumber} / 10 questions
                            </div>
                        </div>
                    </div>
                    {(props.state.activeState === 'repondreReussi' ||
                        props.state.activeState === 'repondreEchoue') && (
                        <button
                            className="nextQuestion"
                            type="button"
                            name="next question"
                            onClick={handleSuivant}
                        >
                            Suivant
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
