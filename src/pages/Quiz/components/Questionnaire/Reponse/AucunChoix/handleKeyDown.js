import handleReponse from '../../Logic/handleReponse';

// permet de peser sur enter pour soumettre la reponse
function handleKeyDown(e, input) {
    if (e.key.toLowerCase() === 'enter') {
        handleReponse(input);
    }
}

export default handleKeyDown;
