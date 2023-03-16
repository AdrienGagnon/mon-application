'use strict';

import ReactDOM from 'react-dom/client';
import React from 'react';

import Imagespreview from './Imagespreview';

import Map from './map';

function App() {
    return (
        <>
            <div className="sidebar">
                <h1>Sélectionnez une photo</h1>
                <div className="content-sidebar">
                    <Imagespreview />
                </div>
            </div>
            <Map />
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
