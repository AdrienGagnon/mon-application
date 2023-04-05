export default function ToMenuSelectionButton(props) {
    function handleToMenuSelection() {
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
