import tauxReussite from '../../utils/tauxReussite';
import corrigerText from './corrigerText';
import handleDeleteResultat from './handleDeleteResultat';

import './AfficherResultats.css';

function AfficherResultats(props) {
    if (props.liste !== []) {
        return props.liste.map((resultat, index) => {
            const pourcentage = Math.floor(
                (100 * resultat.score) / resultat.currentQuestionNumber
            );
            const [_, couleur] = tauxReussite(pourcentage);

            const texte = corrigerText(resultat);

            return (
                <li className={'resultat-item ' + couleur} key={index}>
                    <div className={couleur}>
                        Taux de réussite: {pourcentage}%
                    </div>

                    <div>
                        <div>Score: {resultat.score}</div>
                        <div>
                            Questions répondues:{' '}
                            <span>
                                {resultat.currentQuestionNumber} /{' '}
                                {resultat.nombre}
                            </span>
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
                        onClick={() =>
                            handleDeleteResultat(
                                index,
                                props.liste,
                                props.setListe
                            )
                        }
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

export default AfficherResultats;
