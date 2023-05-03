import tauxReussite from '../../utils/tauxReussite';
import corrigerText from './corrigerText';

import './AfficherResultatActuel.css';

function AfficherResultatActuel(props) {
    if (!props.resultatActuel) {
        return (
            <div className="pas-de-resultat-actuel">
                Vous n'avez pas répondu à assez de questions.
            </div>
        );
    }

    const [resultat] = props.resultatActuel;

    const pourcentage = Math.floor(
        (100 * resultat.score) / resultat.currentQuestionNumber
    );

    const [message, couleur] = tauxReussite(pourcentage);

    const texte = corrigerText(resultat);

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

export default AfficherResultatActuel;
