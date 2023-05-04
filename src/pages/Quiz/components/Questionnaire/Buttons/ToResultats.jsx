import handleToResultats from './handleToResultats';
import './ToResultats.css';

function ToResultatsButton(props) {
    return (
        <button
            className="return-to-resultats"
            onClick={() =>
                handleToResultats(
                    props.disableButton,
                    props.setDisableButton,
                    props.score,
                    props.setAucunResultat,
                    props.quizContext
                )
            }
        >
            Résultats
        </button>
    );
}

export default ToResultatsButton;
