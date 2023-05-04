function handleToMenu(disableButton, setDisableButton, quizContext) {
    // Check if the button has already been pressed
    if (disableButton.retour) {
        return;
    }

    const {
        activePage: [activePage, setActivePage],
        activeState: [activeState, setActiveState],
        transitionState: [transitionState, setTransitionState],
    } = quizContext;

    // Disable button
    setDisableButton({
        ...disableButton,
        retour: true,
    });

    // Commence transition
    const transition = document.querySelector('.transition-shapes-container');
    transition.classList.remove('hidden-shapes');
    setTimeout(() => {
        transition.classList.remove('left');
        transition.classList.add('transition-in-right');
        // Timer to wait for the transition
        setTimeout(() => {
            // Deactivate transition
            transition.classList.remove('transition-in-right');

            setActiveState('');
            setActivePage('MenuSelection');
            setTransitionState({
                ...transitionState,
                transitionToMenu: true,
            });
            window.scrollTo(0, 0);
        }, 2000);
    }, 500);
}

export default handleToMenu;
