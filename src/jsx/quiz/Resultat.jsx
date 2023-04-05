'use strict';

import React, { useState, useEffect } from 'react';
import ToMenuSelectionButton from './MenuButton';

export default function Resultat(props) {
    const [liste, setListe] = useState([]);
    const [resultatActuel, setResultatActuel] = useState(null);

    function handleDeleteResultat(index) {
        const newList = liste.filter((_, i) => {
            return i !== index;
        });
        localStorage.setItem('Resultats', JSON.stringify(newList));

        setListe(newList);
    }

    useEffect(() => {
        const storageJSON = localStorage.getItem('Resultats');
        let storage = '';
        if (storageJSON) {
            storage = JSON.parse(storageJSON);
            setListe(storage);
            setResultatActuel(storage.slice(-1));
        }
    }, []);

    function afficherResultats() {
        if (liste) {
            return liste.map((resultat, index) => {
                const pourcentage = Math.floor(
                    (100 * resultat[0]) / resultat[1]
                );
                const [_, couleur] = calculTauxReussiteMessage(pourcentage);
                return (
                    <li className="resultat-item" key={index}>
                        <div className={couleur}>
                            Taux de réussite: {pourcentage}%
                        </div>

                        <div>Score: {resultat[0]}</div>
                        <div>
                            Questions répondues: {resultat[1]} / {resultat[2]}
                        </div>
                        <button
                            className="delete-resultat"
                            onClick={() => handleDeleteResultat(index)}
                        >
                            Supprimer
                        </button>
                    </li>
                );
            });
        } else {
            return <li>Il n'y a pas de encore résultat.</li>;
        }
    }

    function calculTauxReussiteMessage(pourcentage) {
        let message, couleur;

        switch (true) {
            case pourcentage <= 50:
                message = 'Hum... Vous manquez peut-être de pratique...';
                couleur = 'rouge';
                break;
            case pourcentage > 50 || pourcentage < 80:
                message = 'Pas mal! Vous connaissez bien votre géographie.';
                couleur = 'jaune';
                break;
            case pourcentage >= 80:
                message =
                    'Wow! Soit vous êtes expert en géographie, soit vous avez été chanceux...';
                couleur = 'vert';
                break;
        }
        return [message, couleur];
    }

    function afficherResultatActuel() {
        if (!resultatActuel) return;
        const [scoreArray] = resultatActuel;
        const [score, numberQuestions, totalNumberQuestions] = [
            scoreArray[0],
            scoreArray[1],
            scoreArray[2],
        ];

        const pourcentage = Math.floor((100 * score) / numberQuestions);

        const [message, couleur] = calculTauxReussiteMessage(pourcentage);

        return (
            <div className="score-actuel-container">
                <div className={couleur}>Taux de réussite: {pourcentage}%</div>
                <p className="message-resultat">{message}</p>
                <div className="score">Score: {score}</div>
                <div className="nombre-questions">
                    Questions répondues: {numberQuestions} /{' '}
                    {totalNumberQuestions}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="votre-resultat-container">
                <h1>Votre Résultat</h1>
                {afficherResultatActuel()}
            </div>
            <div className="tous-resultats-container">
                <h1>Tous les résultats</h1>
                <ul className="liste-tous-resultats">{afficherResultats()}</ul>
            </div>
            <div className="buttons-to-menu-resultats-container">
                <ToMenuSelectionButton
                    updatePage={props.updatePage}
                    updateState={props.updateState}
                />
            </div>
        </>
    );
}

/* 
const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
    localStorage.clear('bookmarks');
}; 
*/
