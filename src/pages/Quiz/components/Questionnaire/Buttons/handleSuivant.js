import handleToResultats from './handleToResultats';

// augmente la question actuelle de 1. déclenche useEffect
function handleSuivant(
    disableButton,
    setDisableButton,
    score,
    setScore,
    parametres,
    setActiveState,
    activeState,
    setAucunResultat
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
        if (score.currentQuestionNumber >= parametres.nombre) {
            handleToResultats(
                disableButton,
                setDisableButton,
                setActiveState,
                score,
                parametres,
                activeState,
                setAucunResultat
            );
        }
    }, 700);
}

export default handleSuivant;
