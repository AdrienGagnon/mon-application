import handleToResultats from './handleToResultats';

function ToResultatsButton(props) {
    return (
        <button
            className="return-to-resultats"
            onClick={() =>
                handleToResultats(
                    props.disableButton,
                    props.setDisableButton,
                    props.setActiveState,
                    props.score,
                    props.parametres,
                    props.activeState,
                    props.setAucunResultat
                )
            }
        >
            Résultats
        </button>
    );
}

export default ToResultatsButton;
