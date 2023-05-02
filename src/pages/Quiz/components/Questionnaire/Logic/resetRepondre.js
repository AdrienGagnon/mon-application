// useEffect appel cette fonction pour reseter le state, input et nombre d'essais
function resetRepondre(
    setDisableButton,
    setActiveState,
    setInput,
    score,
    setScore
) {
    // Activer buttons
    setDisableButton({
        retour: false,
        suivant: false,
        resultats: false,
    });

    // changer state repondre
    setActiveState('repondre');

    // clear input
    setInput('');

    // remettre a 0 les essais
    setScore({
        ...score,
        essais: 0,
    });
}

export default resetRepondre;
