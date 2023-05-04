function tauxReussite(pourcentage) {
    let message, couleur;

    switch (true) {
        case pourcentage <= 50:
            message = 'Hum... Vous manquez peut-être de pratique...';
            couleur = 'rouge';
            break;
        case pourcentage > 50 && pourcentage < 80:
            message = 'Pas mal! Vous connaissez bien votre géographie.';
            couleur = 'jaune';
            break;
        case pourcentage >= 80:
            message =
                'Wow! Soit vous êtes expert en géographie, soit vous avez été chanceux...';
            couleur = 'vert';
            break;
    }
    return [message, couleur];
}

export default tauxReussite;
