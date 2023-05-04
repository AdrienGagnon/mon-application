// Augmente le score de un point si la reponse est bonne. Appelé par bonneReponse
function addScorePoint(score, setScore) {
    setScore({
        score: score.score + 1,
        currentQuestionNumber: score.currentQuestionNumber,
        essais: score.essais,
    });
}

export default addScorePoint;
