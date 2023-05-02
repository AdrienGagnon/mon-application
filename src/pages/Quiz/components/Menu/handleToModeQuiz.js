function handleToModeQuiz(selectedParameters, quizContext) {
    const {
        parametres: [parametres, setParametres],
        activePage: [activePage, setActivePage],
        activeState: [activeState, setActiveState],
        transitionState: [transitionState, setTransitionState],
    } = quizContext;

    // remove error message if there is one
    const messageErreur = document.querySelector('.error-message-selection');
    messageErreur.classList.add('hidden-text-selection');

    // transition animation
    const transition = document.querySelector('.transition-shapes-container');
    const earthRotatingVideo = document.querySelector('.earth-rotating-video');
    const optionsSelectionContainer = document.querySelector(
        '.options-selection-container'
    );

    optionsSelectionContainer.classList.add('menu-selection-transistion');
    earthRotatingVideo.classList.add('zoom-on-earth-transition');
    transition.classList.toggle('hidden-shapes');

    setTimeout(() => {
        transition.classList.toggle('right');
        transition.classList.toggle('transition-in-left');

        // letting the animation proceed
        setTimeout(() => {
            transition.classList.toggle('transition-in-left');

            // set parameters state
            setParametres({
                sujet: selectedParameters.sujet,
                choixReponse: selectedParameters.choixReponse,
                mode: selectedParameters.mode,
                nombre: selectedParameters.nombre,
            });
            setActiveState('repondre');
            setActivePage('Question');

            // transition to question page true
            setTransitionState({
                ...transitionState,
                transitionToQuiz: true,
                transitionToMenu: false,
            });
        }, 2000);
    }, 2000);
}

export default handleToModeQuiz;
