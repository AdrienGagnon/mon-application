import ChoixContent from './choixContent';

// Choix de reponse (3)
function ModeChoixReponse(activeCountry, choices) {
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

export default ModeChoixReponse;
