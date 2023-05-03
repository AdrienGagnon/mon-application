import randomCountry from '../../Data/randomCountry';
import fetchCountryData from '../../Data/fetchCountryData';

// Set otherCountries appelé par useEffect.
async function OtherChoices(countryInfo, setChoices) {
    let randomCountries = [];
    // Making sure the answer and the other choices are different
    while (true) {
        const bonneReponse = countryInfo.name.common;
        randomCountries = [randomCountry(), randomCountry()];
        if (!randomCountries.includes(bonneReponse)) {
            break;
        }
    }

    // fetch the other 2 choices
    const choix2Mauvais = await fetchCountryData(randomCountries[0]);
    const choix3Mauvais = await fetchCountryData(randomCountries[1]);

    // Shuffle choices
    const choix = [countryInfo, choix2Mauvais, choix3Mauvais];

    const shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
    shuffleArray(choix);
    setChoices(choix);
}

export default OtherChoices;
