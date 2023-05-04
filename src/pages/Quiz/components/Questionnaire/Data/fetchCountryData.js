// fetch info sur le pays.
async function fetchCountryData(country) {
    try {
        const countryInfoJSON = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
        );
        const [countryInfo] = await countryInfoJSON.json();
        return countryInfo;
    } catch (error) {
        console.log(error);
        alert(
            "Un problème est survenu en faisant appel à la banque de données. Cela peut survenir quand elle reçoit une demande trop importante d'information. Veuillez réessayer ultérieurement."
        );
    }
}

export default fetchCountryData;
