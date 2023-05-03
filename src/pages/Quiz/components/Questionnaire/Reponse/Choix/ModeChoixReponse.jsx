import ChoixContent from './ChoixContent';
import './ModeChoixReponse.css';

// Choix de reponse (3)
function ModeChoixReponse(props) {
    if (
        props.activeCountry === '' ||
        props.choices === undefined ||
        props.choices === [] ||
        props.choices[0] === undefined ||
        props.choices[1] === undefined ||
        props.choices[2] === undefined
    ) {
        return;
    }
    // Trouver index de la bonne reponse
    const indexBonneReponse = props.choices.indexOf(props.activeCountry);
    return (
        <div className="choix-reponse-container">
            <ChoixContent
                choices={props.choices}
                indexBonneReponse={indexBonneReponse}
                score={props.score}
                setScore={props.setScore}
                quizContext={props.quizContext}
            />
        </div>
    );
}

export default ModeChoixReponse;
