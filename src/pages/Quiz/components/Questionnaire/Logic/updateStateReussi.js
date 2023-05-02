import addScorePoint from './addScorePoint';

// Gere une bonne reponse
function updateStateReussi() {
    setActiveState('repondreReussi');
    addScorePoint();
}

export default updateStateReussi;
