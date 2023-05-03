import handleToMenu from './handleToMenu';
import './ToMenuButton.css';

function ToMenuButton(props) {
    return (
        <button
            className="return-to-menu-selection"
            onClick={() =>
                handleToMenu(
                    props.disableButton,
                    props.setDisableButton,
                    props.quizContext
                )
            }
        >
            Retour
        </button>
    );
}

export default ToMenuButton;
