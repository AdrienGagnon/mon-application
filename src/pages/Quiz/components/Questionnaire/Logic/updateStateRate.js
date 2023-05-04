import nombreMaxEssais from './nombreMaxEssais';

// Gere une mauvaise reponse
function updateStateRate(score, setScore, quizContext) {
    setScore({
        score: score.score,
        currentQuestionNumber: score.currentQuestionNumber,
        essais: score.essais + 1,
    });
    // Si les essais sont finis, change le state
    const setActiveState = quizContext.activeState[1];
    if (score.essais === nombreMaxEssais(quizContext.parametres[0]) - 1) {
        setActiveState('repondreEchoue');
    } else {
        setActiveState('repondreRate');
    }
}

export default updateStateRate;
