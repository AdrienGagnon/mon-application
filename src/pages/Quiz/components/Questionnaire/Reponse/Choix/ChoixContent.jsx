import handleChoixReponse from './handleChoixReponse';
import './ChoixContent.css';

// Affiche content des choix de reponse
function ChoixContent(props) {
    const {
        parametres: [parametres, setParametres],
        activeState: [activeState, setActiveState],
    } = props.quizContext;

    return props.choices.map((choix, index) => {
        let content;
        if (parametres.choixReponse === 'le nom du pays') {
            content = choix.translations.fra.common;
        }
        if (parametres.choixReponse === 'la capitale') {
            content = choix.capital;
        }
        if (parametres.choixReponse === 'le drapeau') {
            content = (
                <img className="reponse-drapeau" src={choix.flags.svg} alt="" />
            );
        }

        const activeStateResultat =
            activeState === 'repondreReussi' ||
            activeState === 'repondreEchoue';

        return (
            <button
                key={index}
                className={
                    'choix ' +
                    (index === props.indexBonneReponse
                        ? 'bonne-reponse-choix '
                        : 'mauvaise-reponse-choix ') +
                    (activeStateResultat ? 'choix-resultat-montrer' : '')
                }
                id={
                    parametres.choixReponse === 'le drapeau'
                        ? 'reponse-drapeau-container'
                        : ''
                }
                onClick={e =>
                    handleChoixReponse(
                        e,
                        props.score,
                        props.setScore,
                        props.quizContext
                    )
                }
                disabled={activeStateResultat}
            >
                {content}
            </button>
        );
    });
}

export default ChoixContent;
