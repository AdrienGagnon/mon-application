'use strict';

import React, { useState, useEffect, useRef } from 'react';
import randomCountry from './randomCountry';

export default function Question(props) {
    const [activeCountry, setActiveCountry] = useState('');
    const [score, setScore] = useState({
        score: 0,
        currentQuestion: 1,
        essais: 0,
    });
    const [input, setInput] = useState('');

    // Compare reponse et input, mene soit a reussi ou rate
    function handleReponse() {
        const inputReponse = input
            .toLowerCase()
            .replace('é', 'e')
            .replace(/\s+/g, '');
        const bonneReponse = activeCountry.name.common
            .replace(/\s+/g, '')
            .toLowerCase()
            .replace('é', 'e');
        if (bonneReponse === inputReponse) {
            props.updateState('repondreReussi');
            addScorePoint();
        } else {
            console.log('nope pas ca', inputReponse, bonneReponse, props);
            setScore({
                score: score.score,
                currentQuestion: score.currentQuestion,
                essais: score.essais + 1,
            });
            // Si les essais sont finis, change le state
            if (score.essais === 4) {
                props.updateState('repondreEchoue');
            } else {
                props.updateState('repondreRate');
            }
        }
    }

    // fetch info sur le pays. appelé par useEffect. setActiveCountry
    async function fetchCountryData(country) {
        const countryInfoJSON = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
        );
        const [countryInfo] = await countryInfoJSON.json();
        setActiveCountry(countryInfo);
    }

    // Appelé au debut et a chaque fois que currentQuestion augmente. appel la fonction pour fetch data
    useEffect(() => {
        resetRepondre();
        fetchCountryData(randomCountry());
    }, [score.currentQuestion]);

    // useEffect appel cette fonction pour reseter le state, input et nombre d'essais
    function resetRepondre() {
        // changer state repondre
        props.updateState('repondre');
        // clear input
        setInput('');
        // remettre a 0 les try
        setScore({
            score: score.score,
            currentQuestion: score.currentQuestion,
            essais: 0,
        });
    }

    // Si sujet drapeau, affiche svg du drapeau et le titre
    function sujetDrapeau() {
        if (activeCountry === '') {
            return;
        }
        return (
            <>
                <h1>
                    Sélectionnez le {props.state.choixReponse} correspondant au
                    drapeau
                </h1>
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
            currentQuestion: score.currentQuestion,
            essais: score.essais,
        });
    }

    // Si on doit taper nous meme la reponse
    function modeAucun() {
        return (
            <>
                {props.state.activeState === 'repondreRate' && (
                    <div>Mauvaise réponse</div>
                )}
                <input
                    className="responseQuestion"
                    type="text"
                    placeholder="Votre réponse"
                    value={input}
                    onChange={e => setInput(e.target.value)}
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
            </>
        );
    }

    // augmente la question actuelle de 1. déclenche useEffect
    function handleSuivant() {
        setScore({
            score: score.score,
            currentQuestion: score.currentQuestion + 1,
            essais: score.essais,
        });
    }

    // affiche le nombre d'essais
    function nombreEssai() {
        return <div className="nombre-essais">{score.essais} / 5</div>;
    }

    return (
        <div className="question-page">
            <div className="question-container">
                {props.state.sujet === 'drapeau' && sujetDrapeau()}
            </div>
            <div className="reponse-container">
                <div>Score: {score.score}</div>;
                {props.state.mode === 'aucun choix' && modeAucun()}
            </div>
            {nombreEssai()}
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
        </div>
    );
}
