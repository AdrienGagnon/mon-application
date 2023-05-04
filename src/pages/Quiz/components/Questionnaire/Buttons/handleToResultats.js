import setLocalStorage from '../../LocalStorage/setLocalStorage';

function handleToResultats(
    disableButton,
    setDisableButton,
    score,
    setAucunResultat,
    quizContext
) {
    const {
        parametres: [parametres, setParametres],
        activeState: [activeState, setActiveState],
    } = quizContext;

    // Check if the button has already been pressed
    if (disableButton.resultats) {
        return;
    }
    setDisableButton({
        retour: disableButton.retour,
        suivant: disableButton.suivant,
        resultats: true,
    });

    // add to local storage
    setLocalStorage(score, parametres, activeState, setAucunResultat);

    // update le quizState vers l'ecran resultats
    setActiveState('Resultat');
}

export default handleToResultats;
