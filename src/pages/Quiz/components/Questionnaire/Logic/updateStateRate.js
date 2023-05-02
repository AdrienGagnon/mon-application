import nombreMaxEssais from './nombreMaxEssais';

// Gere une mauvaise reponse
function updateStateRate() {
    setScore({
        score: score.score,
        currentQuestionNumber: score.currentQuestionNumber,
        essais: score.essais + 1,
    });
    // Si les essais sont finis, change le state
    if (score.essais === nombreMaxEssais() - 1) {
        setActiveState('repondreEchoue');
    } else {
        setActiveState('repondreRate');
    }
}

export default updateStateRate;
