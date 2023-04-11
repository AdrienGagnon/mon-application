export default function ToMenuSelectionButton(props) {
    function handleToMenuSelection() {
        // Check if the button has already been pressed
        if (props.disableButton.retour) {
            return;
        }
        props.setDisableButton({
            retour: true,
            suivant: props.disableButton.suivant,
            resultats: props.disableButton.resultats,
        });

        props.updateState('');
        props.updatePage('MenuSelection');
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
