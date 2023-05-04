function updateDimensions(mapInst) {
    let w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        nav = d.getElementsByTagName('nav')[0],
        height =
            w.innerHeight || documentElement.clientHeight || body.clientHeight;
    height -= nav.clientHeight;
    const root = document.getElementById('root');
    root.style.height = height - 1 + 'px';
    if (mapInst) {
        mapInst.target.invalidateSize();
    }
}

export default updateDimensions;
