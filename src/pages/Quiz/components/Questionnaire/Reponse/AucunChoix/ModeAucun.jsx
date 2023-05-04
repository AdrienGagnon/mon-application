import handleKeyDown from './handleKeyDown';
import handleReponse from '../../Logic/handleReponse';
import './ModeAucun.css';

// Si on doit taper nous meme la reponse
function ModeAucun(props) {
    const activeState = props.quizContext.activeState[0];
    return (
        <div className="type-reponse-container">
            <div className="reponse-text-container">
                {(activeState === 'repondreRate' ||
                    activeState === 'repondreEchoue') && (
                    <div className="mauvaise-reponse-text reponse-text">
                        Mauvaise réponse!
                    </div>
                )}
                {activeState === 'repondreReussi' && (
                    <div className="bonne-reponse-text reponse-text">
                        Bonne réponse!
                    </div>
                )}
            </div>
            <input
                className="reponseQuestion"
                type="text"
                placeholder="Votre réponse"
                value={props.input}
                onChange={e => props.setInput(e.target.value)}
                onKeyDown={e => handleKeyDown(e, props.input)}
                disabled={
                    activeState === 'repondreReussi' ||
                    activeState === 'repondreEchoue'
                }
            />
            <div className="submitReponse-container">
                {activeState !== 'repondreReussi' &&
                    activeState !== 'repondreEchoue' && (
                        <button
                            className="submitReponse"
                            type="button"
                            name="Soumettre la reponse"
                            onClick={() =>
                                handleReponse(
                                    props.input,
                                    props.activeCountry,
                                    props.score,
                                    props.setScore,
                                    props.quizContext
                                )
                            }
                            disabled={!props.input}
                        >
                            Soumettre
                        </button>
                    )}
            </div>
        </div>
    );
}

export default ModeAucun;
