function getMaxBounds(countryInfo, setMapBounds, map) {
    if (!countryInfo) return;
    setMapBounds([
        [countryInfo.latlng[0] - 10, countryInfo.latlng[1] - 10],
        [countryInfo.latlng[0] + 10, countryInfo.latlng[1] + 10],
    ]);
    map.target.maxBounds([
        [countryInfo.latlng[0] - 10, countryInfo.latlng[1] - 10],
        [countryInfo.latlng[0] + 10, countryInfo.latlng[1] + 10],
    ]);
}

export default getMaxBounds;
