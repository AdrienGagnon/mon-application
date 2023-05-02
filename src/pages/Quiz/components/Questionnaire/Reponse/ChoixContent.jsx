import handleChoixReponse from './handleChoixReponse';

// Affiche content des choix de reponse
function ChoixContent(choixShuffle, indexBonneReponse) {
    return choixShuffle.map((choix, index) => {
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
        return (
            <button
                key={index}
                className={
                    'choix ' +
                    (index === indexBonneReponse
                        ? 'bonne-reponse-choix '
                        : 'mauvaise-reponse-choix ') +
                    (activeState === 'repondreReussi' ||
                    activeState === 'repondreEchoue'
                        ? 'choix-resultat-montrer'
                        : '')
                }
                id={
                    parametres.choixReponse === 'le drapeau'
                        ? 'reponse-drapeau-container'
                        : ''
                }
                onClick={e => handleChoixReponse(e)}
                disabled={
                    activeState === 'repondreReussi' ||
                    activeState === 'repondreEchoue'
                }
            >
                {content}
            </button>
        );
    });
}

export default ChoixContent;
