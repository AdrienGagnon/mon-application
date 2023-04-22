export default function ToMenuSelectionButton(props) {
    function handleToMenuSelection() {
        // Check if the button has already been pressed
        if (props.disableButton.retour) {
            return;
        }

        // Disable button
        props.setDisableButton({
            retour: true,
            suivant: props.disableButton.suivant,
            resultats: props.disableButton.resultats,
        });

        // Commence transition
        const transition = document.querySelector(
            '.transition-shapes-container'
        );
        transition.classList.remove('hidden-shapes');
        setTimeout(() => {
            transition.classList.remove('left');
            transition.classList.add('transition-in-right');

            // Timer to wait for the transition
            setTimeout(() => {
                // Deactivate transition
                transition.classList.remove('transition-in-right');

                props.updateState('');
                props.updatePage('MenuSelection');
                props.updateTransitionMenu(true);
            }, 2000);
        }, 500);
    }

    return (
        <button
            className="return-to-menu-selection"
            onClick={handleToMenuSelection}
        >
            Retour
        </button>
    );
}
