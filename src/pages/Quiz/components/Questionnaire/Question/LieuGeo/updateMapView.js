// Fly to position of the new country
function updateMapView(countryInfo) {
    if (!countryInfo) return;
    map.target.flyTo(countryInfo.latlng, 6, {
        animate: true,
        duration: 1,
    });
}

export default updateMapView;
