'use strict';

import ReactDOM from 'react-dom/client';
import React, { Component } from 'react';

import MenuSelection from './MenuSelection';
import Question from './Question';
import Resultat from './Resultat';

class AppQuiz extends Component {
    // state = {
    //     activePage: 'MenuSelection',
    //     sujet: '',
    //     choixReponse: '',
    //     mode: '',
    // };

    state = {
        activePage: 'Question',
        activeState: 'repondre',
        sujet: 'drapeau',
        choixReponse: 'au nom du pays',
        mode: 'choix',
    };

    constructor() {
        super();
        this.toggleMenu();
    }

    updatePage = newActivePage => {
        // active page
        this.setState(() => ({
            activePage: newActivePage,
        }));
    };

    updateState = newActiveState => {
        // active page
        this.setState(() => ({
            activeState: newActiveState,
        }));
    };

    updateModeQuiz = ([sujet, choixReponse, mode]) => {
        // active page
        this.setState(() => ({
            sujet: sujet.value,
            choixReponse: choixReponse.value,
            mode: mode.value,
        }));
    };

    toggleMenu() {
        const menu = document.getElementById('menu-toggle');
        menu.addEventListener('click', function () {
            menu.classList.toggle('open');
            document.getElementById('nav-quiz').classList.toggle('open');
        });
    }

    render() {
        return (
            <>
                {/* <MenuSelection
                    updateState={this.updateState}
                    updateModeQuiz={this.updateModeQuiz}
                    transition={
                        this.state.activePage === 'MenuSelection' ? false : true
                    }
                />
                <div className="transition-shapes">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> */}

                <div className="quiz-container">
                    {this.state.activePage === 'Question' && (
                        <Question
                            updatePage={this.updatePage}
                            updateState={this.updateState}
                            state={this.state}
                        />
                    )}
                </div>
            </>
        );
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
