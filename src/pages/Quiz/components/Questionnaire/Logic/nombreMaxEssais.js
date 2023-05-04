// gere le nombre d'essais selon le mode de jeu
function nombreMaxEssais(parametres) {
    return parametres.mode === 'choix' ? 1 : 5;
}

export default nombreMaxEssais;
