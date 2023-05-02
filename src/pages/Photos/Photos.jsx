import './Photos.css';

import { useEffect, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet/lib';

import ToggleMenu from '../../components/ToggleMenu/ToggleMenu';

import Imagespreview from './components/Imagespreview';
import Markersandpopup from './components/Markersandpopup';

import updateDimensions from './utils/updateDimensions';

function PhotoApp() {
    const [state, setState] = useState({
        activeImg: null,
        height: 1,
        navHeight: 111,
        loaded: true,
    });
    const [mapInst, setMapInst] = useState();

    useEffect(() => {
        document.body.classList = 'body-photos';
        window.scrollTo(0, 0);
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        setTimeout(() => {
            setState({ ...state, loaded: false });
            setTimeout(() => {
                setState({ ...state, loaded: 1 });
            }, 1000);
        }, 500);

        // return window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        flyToMarker();
    });

    function handleToggleMenu(e) {
        e.target.closest('#menu-toggle').classList.toggle('open');
        document.querySelector('nav').classList.toggle('open');
        updateDimensions();
    }

    function togglePanel() {
        const menu = document.querySelector('.photo-menu');
        menu.classList.toggle('open');
        document.querySelector('.sidebar').classList.toggle('open');
        updateDimensions();
        scrollPanelTo(state.activeImg);
    }

    function updateHeight(height) {
        // change height of image
        setState({ ...state, height: height });
    }

    function scrollPanelTo(img) {
        if (!img) return;
        const contentSidebar = document.querySelector('.content-sidebar');
        const currentCard = contentSidebar.children.item(img.id);
        const currentCardImg = currentCard.querySelector('.photo-container');

        // scroll to
        const topOff = currentCard.offsetTop;
        contentSidebar.scrollTop = topOff - 300;

        // change aspect of current card
        currentCardImg.classList.add('activeCard');
    }

    function updateState(img) {
        // remove aspect of old active card
        const oldActiveCard = document.querySelector('.activeCard');
        if (oldActiveCard !== null) {
            oldActiveCard.classList.remove('activeCard');
        }

        // active image
        setState({ ...state, activeImg: img });

        scrollPanelTo(img);

        // Update dimensions
        updateDimensions();
    }

    function flyToMarker() {
        if (!state.activeImg || !state.height) return;
        const px = mapInst.target.project(state.activeImg.coords);

        px.y -= state.height / 2;
        const newCoords = mapInst.target.unproject(px);
        mapInst.target.flyTo(newCoords, mapInst.target.getZoom(), {
            animate: true,
            duration: 1,
        });
    }

    const coords = [45, 7];

    return (
        <>
            <ToggleMenu handleToggleMenu={handleToggleMenu} />
            {state.loaded !== 1 && (
                <div
                    className={
                        'loading-screen ' + (state.loaded ? '' : 'fade-out')
                    }
                >
                    <div className="loading-screen-spin photos-spin"></div>
                </div>
            )}
            <div className="photo-content-container">
                <a
                    id="menu-toggle"
                    className="open photo-menu"
                    onClick={togglePanel}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                <div className="sidebar">
                    <h1>Sélectionnez une photo</h1>
                    <div className="content-sidebar">
                        <Imagespreview
                            flyToMarker={flyToMarker}
                            updateState={updateState}
                            state={state}
                        />
                    </div>
                </div>
                <MapContainer
                    maxBounds={[
                        [0.11832122328452595, -87.93179010344474],
                        [79.3886171442911, 104.2877041908634],
                    ]}
                    maxBoundsViscosity={0.6}
                    minZoom={4}
                    center={coords}
                    zoom={5}
                    whenReady={setMapInst}
                >
                    <TileLayer
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}"
                        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        subdomains="abcd"
                        minZoom={0}
                        maxZoom={18}
                        ext="png"
                    />
                    <Markersandpopup
                        flyToMarker={flyToMarker}
                        updateState={updateState}
                        updateHeight={updateHeight}
                        state={state}
                        mapInst={mapInst}
                    />
                </MapContainer>
            </div>
        </>
    );
}

export default PhotoApp;
