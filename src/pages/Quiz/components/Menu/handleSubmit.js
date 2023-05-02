import handleToErrorSelection from './handleToErrorSelection';
import handleToModeQuiz from './handleToModeQuiz';

const handleSubmit = (selectedParameters, quizContext) => {
    const drapeauAucunChoix =
        selectedParameters.choixReponse === 'le drapeau' &&
        selectedParameters.mode === 'aucun choix';
    const sameSujet =
        (selectedParameters.choixReponse.includes('drapeau') &&
            selectedParameters.sujet.includes('drapeau')) ||
        (selectedParameters.choixReponse.includes('capitale') &&
            selectedParameters.sujet.includes('capitale'));
    selectedParameters.choixReponse === 'le drapeau' &&
        selectedParameters.choixReponse === 'le drapeau';
    if (sameSujet || drapeauAucunChoix) {
        handleToErrorSelection();
    } else {
        handleToModeQuiz(selectedParameters, quizContext);
    }
};

export default handleSubmit;
