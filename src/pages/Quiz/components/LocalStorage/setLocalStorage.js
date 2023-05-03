// Enregistre le score au local storage
function setLocalStorage(score, parametres, activeState, setAucunResultat) {
    // Get existing data
    let storage;
    const storageJSON = localStorage.getItem('Resultats');

    // Check if manualy go to resultats
    let nombreQuestionsRepondues = score.currentQuestionNumber;

    if (
        score.currentQuestionNumber + '' !== parametres.nombre &&
        activeState !== 'repondreReussi' &&
        activeState !== 'repondreEchoue'
    ) {
        nombreQuestionsRepondues--;
    }

    if (nombreQuestionsRepondues === 0) {
        setAucunResultat(true);
        return;
    }

    setAucunResultat(false);

    if (storageJSON) {
        storage = JSON.parse(storageJSON);
        // Set data to local storage
        localStorage.setItem(
            'Resultats',
            JSON.stringify([
                ...storage,
                {
                    score: score.score,
                    currentQuestionNumber: nombreQuestionsRepondues,
                    nombre: parametres.nombre,
                    sujet: parametres.sujet,
                    choixReponse: parametres.choixReponse,
                    mode: parametres.mode,
                },
            ])
        );
    } else {
        // Set data to local storage if nothing yet
        localStorage.setItem(
            'Resultats',
            JSON.stringify([
                {
                    score: score.score,
                    currentQuestionNumber: score.currentQuestionNumber,
                    nombre: parametres.nombre,
                    sujet: parametres.sujet,
                    choixReponse: parametres.choixReponse,
                    mode: parametres.mode,
                },
            ])
        );
    }
}

export default setLocalStorage;
