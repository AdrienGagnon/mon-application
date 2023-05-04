import genereBonneReponse from './genereBonneReponse';
import updateStateReussi from './updateStateReussi';
import updateStateRate from './updateStateRate';

// Compare reponse et input, mene soit a reussi ou rate
function handleReponse(input, activeCountry, score, setScore, quizContext) {
    const inputReponse = input
        .toLowerCase()
        .replace('é', 'e')
        .replace(/\s+/g, '');
    const bonneReponse = genereBonneReponse(activeCountry);
    if (bonneReponse.includes(inputReponse)) {
        updateStateReussi(score, setScore, quizContext);
    } else {
        updateStateRate(score, setScore, quizContext);
    }
}

export default handleReponse;
