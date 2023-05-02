import handleKeyDown from './handleKeyDown';
import handleReponse from '../Logic/handleReponse';

// Si on doit taper nous meme la reponse
function ModeAucun(props) {
    return (
        <div className="type-reponse-container">
            <div className="reponse-text-container">
                {(props.props.activeState === 'repondreRate' ||
                    props.activeState === 'repondreEchoue') && (
                    <div className="mauvaise-reponse-text reponse-text">
                        Mauvaise réponse!
                    </div>
                )}
                {props.activeState === 'repondreReussi' && (
                    <div className="bonne-reponse-text reponse-text">
                        Bonne réponse!
                    </div>
                )}
            </div>
            <input
                className="reponseQuestion"
                type="text"
                placeholder="Votre réponse"
                value={input}
                onChange={e => props.setInput(e.target.value)}
                onKeyDown={e => handleKeyDown(e, props.input)}
                disabled={
                    props.activeState === 'repondreReussi' ||
                    props.activeState === 'repondreEchoue'
                }
            />
            <div className="submitReponse-container">
                {props.activeState !== 'repondreReussi' &&
                    props.activeState !== 'repondreEchoue' && (
                        <button
                            className="submitReponse"
                            type="button"
                            name="Soumettre la reponse"
                            onClick={() => handleReponse(props.input)}
                            disabled={!input}
                        >
                            Soumettre
                        </button>
                    )}
            </div>
        </div>
    );
}

export default ModeAucun;
