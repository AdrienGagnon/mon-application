'use strict';

import ReactDOM from 'react-dom/client';
import React, { Component } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet/lib';

import Imagespreview from './Imagespreview';
import MarksAndPops from './marksAndPopups';

class App extends Component {
    state = {
        activeImg: null,
    };

    constructor() {
        super();
        this.loaded();
    }

    updateState = img => {
        this.setState(() => ({ activeImg: img }));
    };

    saveMap = mapInst => {
        this.setState(() => ({ map: mapInst }));
    };

    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
                (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
                (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    isCardVisible() {
        const cards = document.querySelectorAll('.photo-container');
        const allo = this.isElementInViewport;
        console.log('yep');
        for (const card of cards) {
            allo
                ? card.classList.add('photo-containerNotVisible')
                : card.classList.remove('photo-containerNotVisible');
        }
    }

    shrinkCards() {
        const sidebarContainer = document.querySelector('content-sidebar');
        console.log(sidebarContainer);
        sidebarContainer.addEventListener('scroll', this.isCardVisible);
        document.addEventListener('DOMContentLoaded', this.isCardVisible);
        window.addEventListener('scroll', this.isCardVisible);
        window.addEventListener('resize', this.isCardVisible);
    }

    loaded() {
        window.addEventListener('DOMContentLoaded', this.shrinkCards);
    }

    render() {
        const coords = [45, 7];
        return (
            <>
                <div className="sidebar">
                    <h1>Sélectionnez une photo</h1>
                    <div className="content-sidebar">
                        <Imagespreview
                            updateState={this.updateState}
                            state={this.state}
                        />
                    </div>
                </div>
                <MapContainer center={coords} zoom={5} ref={this.saveMap}>
                    <TileLayer
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}"
                        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        subdomains="abcd"
                        minZoom={0}
                        maxZoom={18}
                        ext="png"
                    />
                    <MarksAndPops
                        updateState={this.updateState}
                        state={this.state}
                    />
                </MapContainer>
            </>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
