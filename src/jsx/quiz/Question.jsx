'use strict';

import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';

import randomCountry from './randomCountry';
import Resultat from './Resultat';
import ToMenuSelectionButton from './MenuButton';
import { StateContext } from './quiz';

export default function Question(props) {
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

    // Gere une bonne reponse
    function updateStateReussi() {
        props.updateState('repondreReussi');
        addScorePoint();
    }

    // Gere une mauvaise reponse
    function updateStateRate() {
        setScore({
            score: score.score,
            currentQuestionNumber: score.currentQuestionNumber,
            essais: score.essais + 1,
        });
        // Si les essais sont finis, change le state
        if (score.essais === nombreMaxEssais() - 1) {
            props.updateState('repondreEchoue');
        } else {
            props.updateState('repondreRate');
        }
    }

    // Analyse si le choix de reponse est bon
    function handleChoixReponse(e) {
        if (
            e.target.classList[1] === 'bonne-reponse-choix' ||
            e.target.parentElement?.classList[1] === 'bonne-reponse-choix'
        ) {
            updateStateReussi();
        } else {
            updateStateRate();
        }
    }

    // Set activeCountry appelé par useEffect.
    async function setActiveCountryFunction(country) {
        const countryInfo = await fetchCountryData(country);
        props.state.mode === 'choix' && setOtherCountriesFunction(countryInfo);
        if (props.state.sujet === 'au lieu géographique' && map) {
            updateMapView(countryInfo);
        }
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

        // Shuffle choices
        const choix = [countryInfo, choix2Mauvais, choix3Mauvais];

        const shuffleArray = array => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        };
        shuffleArray(choix);
        setChoices(choix);
    }

    // fetch info sur le pays.
    async function fetchCountryData(country) {
        try {
            const countryInfoJSON = await fetch(
                `https://restcountries.com/v3.1/name/${country}`
            );
            const [countryInfo] = await countryInfoJSON.json();
            return countryInfo;
        } catch (error) {
            console.log(error);
        }
    }

    // Appelé au debut et a chaque fois que currentQuestionNumber augmente. appel la fonction pour fetch data
    useEffect(() => {
        if (props.state.activeState === 'Resultat') return;
        resetRepondre();
        setActiveCountryFunction(randomCountry());
    }, [score.currentQuestionNumber]);

    // useEffect appel cette fonction pour reseter le state, input et nombre d'essais
    function resetRepondre() {
        // Activer buttons
        setDisableButton({
            retour: false,
            suivant: false,
            resultats: false,
        });

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

    // Fly to position of the new country
    function updateMapView(countryInfo) {
        if (!countryInfo) return;
        map.target.flyTo(countryInfo.latlng, 6, {
            animate: true,
            duration: 1,
        });
    }

    // Genere la bonne reponse en enlevant les espaces et les signes
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

    // Génère le titre en fonction du mode et de le reponse
    function afficherTitre() {
        let premierMot;
        if (props.state.mode === 'aucun choix') {
            premierMot = 'Écrivez';
        }
        if (props.state.mode === 'choix') {
            premierMot = 'Sélectionnez';
        }

        return (
            <>
                <h1 className="question-title">
                    {premierMot} {props.state.choixReponse} correspondant{' '}
                    {props.state.sujet}
                </h1>
                {(props.state.activeState === 'repondreReussi' ||
                    props.state.activeState === 'repondreEchoue') &&
                    reponseActuelle()}
            </>
        );
    }

    // Si sujet drapeau, affiche svg du drapeau et le titre
    function sujetDrapeau() {
        if (activeCountry === '') {
            return;
        }

        return (
            <div className="question-drapeau-container">
                <img
                    className="question-drapeau"
                    src={activeCountry.flags.svg}
                    alt=""
                />
            </div>
        );
    }

    // Si sujet capitale, affiche capitale et le titre
    function sujetCapitale() {
        if (activeCountry === '') {
            return;
        }

        return (
            <div className="question-capitale-container">
                Nom de la capitale: {activeCountry.capital}
            </div>
        );
    }

    // Si sujet lieu-geo, affiche carte avec marqueur du pays et le titre
    function sujetLieuGeo() {
        if (activeCountry === '') {
            return;
        }

        return (
            <div className="question-lieu-geo-container">
                <MapContainer
                    center={activeCountry.latlng}
                    zoom={6}
                    scrollWheelZoom={true}
                    whenReady={setMap}
                >
                    <TileLayer
                        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}"
                        subdomains="abcd"
                        minZoom={2}
                        maxZoom={18}
                        ext="png"
                    />
                    <Marker position={activeCountry.latlng}></Marker>
                </MapContainer>
            </div>
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
            choices === undefined ||
            choices === [] ||
            choices[0] === undefined ||
            choices[1] === undefined ||
            choices[2] === undefined
        ) {
            return;
        }
        // Trouver index de la bonne reponse
        const indexBonneReponse = choices.indexOf(activeCountry);
        return (
            <div className="choix-reponse-container">
                {choixContent(choices, indexBonneReponse)}
            </div>
        );
    }

    // Affiche content des choix de reponse
    function choixContent(choixShuffle, indexBonneReponse) {
        return choixShuffle.map((choix, index) => {
            let content;
            if (props.state.choixReponse === 'le nom du pays') {
                content = choix.translations.fra.common;
            }
            if (props.state.choixReponse === 'la capitale') {
                content = choix.capital;
            }
            if (props.state.choixReponse === 'le drapeau') {
                content = (
                    <img
                        className="reponse-drapeau"
                        src={choix.flags.svg}
                        alt=""
                    />
                );
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
                    id={
                        props.state.choixReponse === 'le drapeau'
                            ? 'reponse-drapeau-container'
                            : ''
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
        // Check if the button has already been pressed
        if (disableButton.suivant) {
            return;
        }
        setDisableButton({
            retour: disableButton.retour,
            suivant: true,
            resultats: disableButton.resultats,
        });

        const reponseActuelle = document.querySelector('.reponse-actuelle');
        reponseActuelle.classList.toggle('slideOut');
        setTimeout(() => {
            setScore({
                score: score.score,
                currentQuestionNumber: score.currentQuestionNumber + 1,
                essais: score.essais,
            });
            reponseActuelle.classList.toggle('slideOut');
            if (score.currentQuestionNumber >= props.state.nombre) {
                handleToResultats();
            }
        }, 700);
    }

    // Enregistre le score au local storage
    function persistResultats() {
        // Get existing data
        let storage;
        const storageJSON = localStorage.getItem('Resultats');
        if (storageJSON) {
            storage = JSON.parse(storageJSON);
            // Set data to local storage
            localStorage.setItem(
                'Resultats',
                JSON.stringify([
                    ...storage,
                    [
                        score.score,
                        score.currentQuestionNumber,
                        props.state.nombre,
                    ],
                ])
            );
        } else {
            // Set data to local storage if nothing yet
            localStorage.setItem(
                'Resultats',
                JSON.stringify([
                    [
                        score.score,
                        score.currentQuestionNumber,
                        props.state.nombre,
                    ],
                ])
            );
        }
    }

    // permet de peser sur enter pour soumettre la reponse
    function handleKeyDown(e) {
        if (e.key.toLowerCase() === 'enter') {
            handleReponse();
        }
    }

    function handleToResultats() {
        // Check if the button has already been pressed
        if (disableButton.resultats) {
            return;
        }
        setDisableButton({
            retour: disableButton.retour,
            suivant: disableButton.suivant,
            resultats: true,
        });

        // add to local storage
        persistResultats();

        // update le state vers l'ecran resultats
        props.updateState('Resultat');
    }

    // gere le nombre d'essais selon le mode de jeu
    function nombreMaxEssais() {
        return props.state.mode === 'choix' ? 1 : 5;
    }

    // Affiche le nombre d'essais
    function affichageEssais() {
        return (
            <>
                {score.essais} / {nombreMaxEssais()} essais
            </>
        );
    }

    return (
        <div className="question-page">
            {props.state.activeState === 'Resultat' ? (
                <Resultat
                    setDisableButton={setDisableButton}
                    disableButton={disableButton}
                    updatePage={props.updatePage}
                    updateState={props.updateState}
                />
            ) : (
                <>
                    <div className="question-container">
                        {afficherTitre()}

                        {props.state.sujet === 'au drapeau' && sujetDrapeau()}
                        {props.state.sujet === 'à la capitale' &&
                            sujetCapitale()}
                        {props.state.sujet === 'au lieu géographique' &&
                            sujetLieuGeo()}
                    </div>
                    <div className="reponse-container">
                        {props.state.mode === 'aucun choix' && modeAucun()}
                        {props.state.mode === 'choix' && modeChoixReponse()}
                        <div className="stats-question">
                            <div>Score: {score.score}</div>
                            <div className="nombre-essais">
                                {affichageEssais()}
                            </div>
                            <div className="currentQuestionNumber">
                                {score.currentQuestionNumber} /{' '}
                                {props.state.nombre} questions
                            </div>
                        </div>
                    </div>
                    <div className="buttons-to-menu-resultats-container">
                        <button
                            className="return-to-resultats"
                            onClick={handleToResultats}
                        >
                            Résultats
                        </button>
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
                        <ToMenuSelectionButton
                            setDisableButton={setDisableButton}
                            disableButton={disableButton}
                            updatePage={props.updatePage}
                            updateState={props.updateState}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
