'use strict';

import ReactDOM from 'react-dom/client';
import React from 'react';

import Sidebar from './sidebar';
import Map from './map';

function App() {
    return (
        <div className="body-container">
            <div className="sidebar-container">
                <div className="sidebar">
                    <h1>Click on a photo</h1>
                    <div className="content-sidebar">
                        <Sidebar />
                    </div>
                </div>
            </div>
            <div id="map-container">
                <Map />
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
