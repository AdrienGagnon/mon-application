// Analyse si le choix de reponse est bon
function handleChoixReponse(e) {
    if (
        e.target.classList[1] === 'bonne-reponse-choix' ||
        e.target.parentElement?.classList[1] === 'bonne-reponse-choix'
    ) {
        updateStateReussi();
    } else {
        updateStateRate();
    }
}

export default handleChoixReponse;
