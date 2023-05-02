import fetchCountryData from './fetchCountryData';
import OtherChoices from '../Reponse/OtherChoices';
import updateMapView from '../Question/LieuGeo/updateMapView';
import getMaxBounds from '../Question/LieuGeo/getMaxBounds';

// Set activeCountry appelé par useEffect.
async function ActiveCountry(
    country,
    parametres,
    setActiveCountry,
    setChoices,
    map,
    setMapBounds
) {
    const countryInfo = await fetchCountryData(country);
    parametres.mode === 'choix' && OtherChoices(countryInfo, setChoices);
    if (parametres.sujet === 'au lieu géographique' && map) {
        updateMapView(countryInfo, map);
        getMaxBounds(countryInfo, setMapBounds);
    }
    setActiveCountry(countryInfo);
}

export default ActiveCountry;
