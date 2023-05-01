const updateZoomImage = (
    direction,
    [imageSettings, setImageSettings],
    updateHeight
) => {
    const img = document.querySelector('.img-map');
    const possibleHeight = [200, 300, 400, 500, 600];
    const index = possibleHeight.indexOf(imageSettings.zoomLevel);
    let newZoomLevel;
    if (direction === 'in') {
        if (index === possibleHeight.length - 1) {
            return;
        }
        newZoomLevel = possibleHeight[index + 1];
    } else {
        if (index === 0) {
            return;
        }
        newZoomLevel = possibleHeight[index - 1];
    }
    setImageSettings({
        height: imageSettings.height,
        zoomLevel: newZoomLevel,
    });
    img.style.height = newZoomLevel + 'px';
    updateHeight(newZoomLevel);
};

export default updateZoomImage;
