// Genere la bonne reponse en enlevant les espaces et les signes
function genereBonneReponse() {
    return [
        activeCountry.translations.fra.official
            .replace(/\s+/g, '')
            .toLowerCase()
            .replace('é', 'e'),
        activeCountry.translations.fra.common
            .replace(/\s+/g, '')
            .toLowerCase()
            .replace('é', 'e'),
        activeCountry.name.common
            .replace(/\s+/g, '')
            .toLowerCase()
            .replace('é', 'e'),
        activeCountry.name.official
            .replace(/\s+/g, '')
            .toLowerCase()
            .replace('é', 'e'),
    ];
}

export default genereBonneReponse;
