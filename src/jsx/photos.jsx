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
        this.toggleMenu();
    }

    toggleMenu() {
        const menu = document.getElementById('menu-toggle');
        menu.addEventListener('click', function () {
            menu.classList.toggle('open');
            document.getElementById('nav-photos').classList.toggle('open');
        });
    }

    updateState = img => {
        const currentCard = document
            .querySelector('.content-sidebar')
            .children.item(img.id);
        const currentCardImg = currentCard.querySelector('.photo-container');
        const contentSidebar = document.querySelector('.content-sidebar');

        // remove aspect of old active card
        const oldActiveCard = document.querySelector('.activeCard');
        if (oldActiveCard !== null) {
            oldActiveCard.classList.remove('activeCard');
        }

        // active image
        this.setState(() => ({ activeImg: img }));

        // scroll to
        const topOff = currentCard.offsetTop;
        contentSidebar.scrollTop = topOff - 450;

        // change aspect of current card
        currentCardImg.classList.add('activeCard');
    };

    saveMap = mapInst => {
        this.setState(() => ({ map: mapInst }));
    };

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
