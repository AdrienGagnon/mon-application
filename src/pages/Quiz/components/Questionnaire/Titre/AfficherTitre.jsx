import ReponseActuelle from './ReponseActuelle';

// Génère le titre en fonction du mode et de le reponse
function AfficherTitre(props) {
    let premierMot;
    if (props.parametres.mode === 'aucun choix') {
        premierMot = 'Écrivez';
    }
    if (props.parametres.mode === 'choix') {
        premierMot = 'Sélectionnez';
    }

    return (
        <>
            <h1 className="question-title">
                {premierMot} {props.parametres.choixReponse} correspondant{' '}
                {props.parametres.sujet}
            </h1>
            {(props.activeState === 'repondreReussi' ||
                props.activeState === 'repondreEchoue') && (
                <ReponseActuelle
                    activeCountry={props.activeCountry}
                    activeState={props.activeState}
                />
            )}
        </>
    );
}

export default AfficherTitre;
