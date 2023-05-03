import addScorePoint from './addScorePoint';

// Gere une bonne reponse
function updateStateReussi(score, setScore, quizContext) {
    quizContext.activeState[1]('repondreReussi');
    addScorePoint(score, setScore);
}

export default updateStateReussi;
