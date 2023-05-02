import React, { useState, useEffect } from 'react';
import ToMenuSelectionButton from '../Questionnaire/Buttons/ToMenuButton';

import tauxReussite from '../../utils/tauxReussite';

export default function Resultat(props) {
    const [liste, setListe] = useState([]);
    const [resultatActuel, setResultatActuel] = useState(null);
    const {
        parametres: [parametres, setParametres],
        activePage: [activePage, setActivePage],
        activeState: [activeState, setActiveState],
        transitionState: [transitionState, setTransitionState],
    } = props.quizContext;

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

            if (props.aucunResultat) {
                setResultatActuel(false);
            } else {
                setResultatActuel(storage.slice(-1));
            }
        }
    }, []);

    function corrigerTexte(resultat) {
        if (!resultat) return;
        // Corriger le texte
        let texte = { sujet: '', choixReponse: '', mode: '' };
        switch (resultat.sujet) {
            case 'au drapeau':
                texte.sujet = 'Avec le drapeau';
                break;
            case 'à la capitale':
                texte.sujet = 'Avec la capitale';
                break;
            case 'au lieu géographique':
                texte.sujet = 'Avec le lieu géographique';
        }

        switch (resultat.choixReponse) {
            case 'le nom du pays':
                texte.choixReponse = 'Donner le nom du pays';
                break;
            case 'la capitale':
                texte.choixReponse = 'Donner la capitale';
                break;
            case 'le drapeau':
                texte.choixReponse = 'Identifier le drapeau';
        }

        switch (resultat.mode) {
            case 'choix':
                texte.mode = 'Choix de réponse';
                break;
            case 'aucun choix':
                texte.mode = 'Sans choix de réponse';
        }

        return texte;
    }

    function afficherResultats() {
        if (liste !== []) {
            return liste.map((resultat, index) => {
                const pourcentage = Math.floor(
                    (100 * resultat.score) / resultat.currentQuestionNumber
                );
                const [_, couleur] = tauxReussite(pourcentage);

                const texte = corrigerTexte(resultat);

                return (
                    <li className={'resultat-item ' + couleur} key={index}>
                        <div className={couleur}>
                            Taux de réussite: {pourcentage}%
                        </div>

                        <div>
                            <div>Score: {resultat.score}</div>
                            <div>
                                Questions répondues:{' '}
                                {resultat.currentQuestionNumber} /{' '}
                                {resultat.nombre}
                            </div>
                        </div>
                        <div className="parametres-resultats">
                            <div>Paramètres:</div>
                            <ul>
                                <li>{texte.sujet}</li>
                                <li>{texte.choixReponse}</li>
                                <li>{texte.mode}</li>
                            </ul>
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
            return (
                <li className="pas-de-resultats">
                    Il n'y a pas de encore résultat.
                </li>
            );
        }
    }

    function afficherResultatActuel() {
        if (!resultatActuel) {
            return (
                <div className="pas-de-resultat-actuel">
                    Vous n'avez pas répondu à assez de questions.
                </div>
            );
        }

        const [resultat] = resultatActuel;

        const pourcentage = Math.floor(
            (100 * resultat.score) / resultat.currentQuestionNumber
        );

        const [message, couleur] = tauxReussite(pourcentage);

        const texte = corrigerTexte(resultat);

        return (
            <div className={'score-actuel-container ' + couleur}>
                <div className={couleur}>Taux de réussite: {pourcentage}%</div>
                <p className="message-resultat">{message}</p>
                <div>
                    <div className="score">Score: {resultat.score}</div>
                    <div>
                        Questions répondues: {resultat.currentQuestionNumber} /{' '}
                        {resultat.nombre}
                    </div>
                </div>
                <div className="parametres-resultats">
                    <div>Paramètres:</div>
                    <ul>
                        <li>{texte.sujet}</li>
                        <li>{texte.choixReponse}</li>
                        <li>{texte.mode}</li>
                    </ul>
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
                    setDisableButton={props.setDisableButton}
                    disableButton={props.disableButton}
                    updatePage={props.updatePage}
                    updateState={props.updateState}
                    updateTransitionMenu={props.updateTransitionMenu}
                />
            </div>
        </>
    );
}
