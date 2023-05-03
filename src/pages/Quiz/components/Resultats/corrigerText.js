function corrigerText(resultat) {
    if (!resultat) return;
    // Corriger le texte
    let texte = { sujet: '', choixReponse: '', mode: '' };
    switch (resultat.sujet) {
        case 'au drapeau':
            texte.sujet = 'Avec le drapeau';
            break;
        case 'à la capitale':
            texte.sujet = 'Avec la capitale';
            break;
        case 'au lieu géographique':
            texte.sujet = 'Avec le lieu géographique';
    }

    switch (resultat.choixReponse) {
        case 'le nom du pays':
            texte.choixReponse = 'Donner le nom du pays';
            break;
        case 'la capitale':
            texte.choixReponse = 'Donner la capitale';
            break;
        case 'le drapeau':
            texte.choixReponse = 'Identifier le drapeau';
    }

    switch (resultat.mode) {
        case 'choix':
            texte.mode = 'Choix de réponse';
            break;
        case 'aucun choix':
            texte.mode = 'Sans choix de réponse';
    }

    return texte;
}

export default corrigerText;
