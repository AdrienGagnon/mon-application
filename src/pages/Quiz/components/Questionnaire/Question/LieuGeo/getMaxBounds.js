function getMaxBounds(countryInfo) {
    setMapBounds([
        [countryInfo.latlng[0] - 10, countryInfo.latlng[1] - 10],
        [countryInfo.latlng[0] + 10, countryInfo.latlng[1] + 10],
    ]);
}

export default getMaxBounds;
