import handleToResultats from './handleToResultats';

// augmente la question actuelle de 1. déclenche useEffect
function handleSuivant(
    disableButton,
    setDisableButton,
    score,
    setScore,
    setAucunResultat,
    quizContext
) {
    // Check if the button has already been pressed
    if (disableButton.suivant) {
        return;
    }
    setDisableButton({
        retour: disableButton.retour,
        suivant: true,
        resultats: disableButton.resultats,
    });

    const reponseActuelle = document.querySelector('.reponse-actuelle');
    reponseActuelle.classList.toggle('slideOut');
    setTimeout(() => {
        setScore({
            score: score.score,
            currentQuestionNumber: score.currentQuestionNumber + 1,
            essais: score.essais,
        });
        reponseActuelle.classList.toggle('slideOut');
        if (score.currentQuestionNumber >= quizContext.parametres[0].nombre) {
            handleToResultats(
                disableButton,
                setDisableButton,
                score,
                setAucunResultat,
                quizContext
            );
        }
    }, 700);
}

export default handleSuivant;
