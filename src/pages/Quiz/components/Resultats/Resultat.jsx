import React, { useState, useEffect, useContext } from 'react';
import ToMenuSelectionButton from '../Questionnaire/Buttons/ToMenuButton';

import AfficherResultatActuel from './AfficherResultatActuel';
import AfficherResultats from './AfficherResultats';

import { QuizStateContext } from '../../Quiz';

import './Resultat.css';

export default function Resultat(props) {
    const [liste, setListe] = useState([]);
    const [resultatActuel, setResultatActuel] = useState(null);

    const quizContext = useContext(QuizStateContext);

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

    return (
        <>
            <div className="votre-resultat-container">
                <h1>Votre Résultat</h1>
                <AfficherResultatActuel resultatActuel={resultatActuel} />
            </div>
            <div className="tous-resultats-container">
                <h1>Tous les résultats</h1>
                <ul className="liste-tous-resultats">
                    <AfficherResultats liste={liste} setListe={setListe} />
                </ul>
            </div>
            <div className="buttons-to-menu-resultats-container">
                <ToMenuSelectionButton
                    disableButton={props.disableButton}
                    setDisableButton={props.setDisableButton}
                    quizContext={quizContext}
                />
            </div>
        </>
    );
}
