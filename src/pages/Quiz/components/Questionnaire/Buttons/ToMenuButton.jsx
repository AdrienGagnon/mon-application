import handleToMenu from './handleToMenu';

function ToMenuButton(props) {
    return (
        <button
            className="return-to-menu-selection"
            onClick={() =>
                handleToMenu(
                    props.disableButton,
                    props.setDisableButton,
                    props.setActiveState,
                    props.setActivePage,
                    props.transitionState,
                    props.setTransitionState
                )
            }
        >
            Retour
        </button>
    );
}

export default ToMenuButton;
