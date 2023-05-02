import handleSuivant from './handleSuivant';

function ToSuivantButton(props) {
    return (
        <button
            className="nextQuestion"
            type="button"
            name="next question"
            onClick={() =>
                handleSuivant(
                    props.disableButton,
                    props.setDisableButton,
                    props.score,
                    props.setScore,
                    props.parametres,
                    props.setActiveState,
                    props.activeState,
                    props.setAucunResultat
                )
            }
        >
            Suivant
        </button>
    );
}

export default ToSuivantButton;
