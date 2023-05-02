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
    }
}

export default fetchCountryData;
