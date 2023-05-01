import React, { Component } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet/lib';

import ToggleMenu from '../../components/ToggleMenu/ToggleMenu';

import Imagespreview from './components/Imagespreview';
import Markersandpopup from './components/Markersandpopup';

import updateDimensions from './utils/updateDimensions';

import './Photos.css';

class PhotoApp extends Component {
    state = {
        activeImg: null,
        height: 1,
        navHeight: 111,
        loaded: true,
    };

    componentDidMount() {
        updateDimensions();
        window.addEventListener('resize', updateDimensions.bind(this));
        setTimeout(() => {
            this.setState(() => ({
                loaded: false,
            }));
            setTimeout(() => {
                this.setState(() => ({
                    loaded: 1,
                }));
            }, 1000);
        }, 500);
    }

    handleToggleMenu(e) {
        e.target.closest('#menu-toggle').classList.toggle('open');
        document.querySelector('nav').classList.toggle('open');
        updateDimensions();
    }

    togglePanel() {
        const menu = document.querySelector('.photo-menu');
        menu.classList.toggle('open');
        document.querySelector('.sidebar').classList.toggle('open');
        updateDimensions();
        this.scrollPanelTo(this.state.activeImg);
    }

    updateHeight = height => {
        // change height of image
        this.setState(() => ({
            height: height,
        }));
    };

    scrollPanelTo(img) {
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

    updateState = img => {
        // remove aspect of old active card
        const oldActiveCard = document.querySelector('.activeCard');
        if (oldActiveCard !== null) {
            oldActiveCard.classList.remove('activeCard');
        }

        // active image
        this.setState(() => ({ activeImg: img }));

        this.scrollPanelTo(img);

        // Update dimensions
        updateDimensions();
    };

    saveMap = mapInst => {
        if (!mapInst) return;
        this.setState(() => ({ map: mapInst }));
    };

    flyToMarker() {
        if (!this.state.activeImg || !this.state.height) return;
        const px = this.state.map.project(this.state.activeImg.coords);

        px.y -= this.state.height / 2;

        const newCoords = this.state.map.unproject(px);
        this.state.map.flyTo(newCoords, this.state.map.getZoom(), {
            animate: true,
            duration: 1,
        });
    }

    componentDidUpdate(prevState) {
        if (this.state.activeImg !== prevState.activeImg && this.state.map) {
            this.flyToMarker();
        }
    }

    render() {
        document.body.classList = 'body-photos';
        const coords = [45, 7];
        window.scrollTo(0, 0);
        return (
            <>
                <ToggleMenu
                    handleToggleMenu={this.handleToggleMenu.bind(this)}
                />
                {this.state.loaded !== 1 && (
                    <div
                        className={
                            'loading-screen ' +
                            (this.state.loaded ? '' : 'fade-out')
                        }
                    >
                        <div className="loading-screen-spin photos-spin"></div>
                    </div>
                )}
                <div className="photo-content-container">
                    <a
                        id="menu-toggle"
                        className="open photo-menu"
                        onClick={this.togglePanel.bind(this)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                    <div className="sidebar">
                        <h1>Sélectionnez une photo</h1>
                        <div className="content-sidebar">
                            <Imagespreview
                                flyToMarker={this.flyToMarker}
                                updateState={this.updateState}
                                state={this.state}
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
                        ref={this.saveMap}
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
                            flyToMarker={this.flyToMarker}
                            updateState={this.updateState}
                            updateHeight={this.updateHeight}
                            state={this.state}
                        />
                    </MapContainer>
                </div>
            </>
        );
    }
}

export default PhotoApp;
