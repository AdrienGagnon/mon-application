import updateStateReussi from '../../Logic/updateStateReussi';
import updateStateRate from '../../Logic/updateStateRate';

// Analyse si le choix de reponse est bon
function handleChoixReponse(e, score, setScore, quizContext) {
    if (
        e.target.classList[1] === 'bonne-reponse-choix' ||
        e.target.parentElement?.classList[1] === 'bonne-reponse-choix'
    ) {
        updateStateReussi(score, setScore, quizContext);
    } else {
        updateStateRate(score, setScore, quizContext);
    }
}

export default handleChoixReponse;
