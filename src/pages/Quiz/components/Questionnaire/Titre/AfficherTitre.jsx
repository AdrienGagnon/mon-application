import ReponseActuelle from './ReponseActuelle';

// Génère le titre en fonction du mode et de le reponse
function AfficherTitre(props) {
    const {
        parametres: [parametres, setParametres],
        activeState: [activeState, setActiveState],
    } = props.quizContext;

    let premierMot;
    if (parametres.mode === 'aucun choix') {
        premierMot = 'Écrivez';
    }
    if (parametres.mode === 'choix') {
        premierMot = 'Sélectionnez';
    }

    return (
        <>
            <h1 className="question-title">
                {premierMot} {parametres.choixReponse} correspondant{' '}
                {parametres.sujet}
            </h1>
            {(activeState === 'repondreReussi' ||
                activeState === 'repondreEchoue') && (
                <ReponseActuelle
                    activeCountry={props.activeCountry}
                    activeState={activeState}
                />
            )}
        </>
    );
}

export default AfficherTitre;
