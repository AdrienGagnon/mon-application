'use strict';

import ReactDOM from 'react-dom/client';
import React, { Component } from 'react';

import MenuSelection from './MenuSelection';

class AppQuiz extends Component {
    render() {
        return <MenuSelection />;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root-quiz'));
root.render(<AppQuiz />);

/* 
function resizeNav() {
    // Set the nav height to fill the window
    $("#nav-fullscreen").css({"height": window.innerHeight});

    // Set the circle radius to the length of the window diagonal,
    // this way we're only making the circle as big as it needs to be.
    var radius = Math.sqrt(Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2));
    var diameter = radius * 2;
    $("#nav-overlay").width(diameter);
    $("#nav-overlay").height(diameter);
    $("#nav-overlay").css({"margin-top": -radius, "margin-left": -radius});
} */
