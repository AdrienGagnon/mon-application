import genereBonneReponse from './genereBonneReponse';
import updateStateReussi from './updateStateReussi';
import updateStateRate from './updateStateRate';

import { QuestionContext } from '../Question';

// Compare reponse et input, mene soit a reussi ou rate
function handleReponse(input) {
    const allo = QuestionContext;
    console.log(allo);
    const inputReponse = input
        .toLowerCase()
        .replace('é', 'e')
        .replace(/\s+/g, '');
    const bonneReponse = genereBonneReponse();
    if (bonneReponse.includes(inputReponse)) {
        updateStateReussi();
    } else {
        updateStateRate();
    }
}

export default handleReponse;
