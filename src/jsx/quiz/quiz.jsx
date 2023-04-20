'use strict';

import ReactDOM from 'react-dom/client';
import React, { Component, createContext } from 'react';

import MenuSelection from './MenuSelection';
import Question from './Question';

export const StateContext = createContext(null);

class AppQuiz extends Component {
    state = {
        activePage: 'MenuSelection',
        activeState: '',
        sujet: '',
        choixReponse: '',
        mode: '',
        nombre: 5,
        transitionToQuiz: false,
    };

    // state = {
    //     activePage: 'Question',
    //     activeState: 'repondre',
    //     sujet: 'drapeau',
    //     choixReponse: 'au nom du pays',
    //     mode: 'choix',
    // };

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

    updateTransition = newActiveState => {
        // active page
        this.setState(() => ({
            transitionToQuiz: newActiveState,
        }));
    };

    updateModeQuiz = (sujet, choixReponse, mode, nombre) => {
        // active page
        this.setState(() => ({
            sujet: sujet,
            choixReponse: choixReponse,
            mode: mode,
            nombre: nombre,
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
            <StateContext.Provider value={this.state}>
                <div className="quiz-container">
                    {this.state.activePage === 'MenuSelection' && (
                        <MenuSelection
                            updateTransition={this.updateTransition}
                            updatePage={this.updatePage}
                            updateState={this.updateState}
                            updateModeQuiz={this.updateModeQuiz}
                            transition={
                                this.state.activePage === 'MenuSelection'
                                    ? false
                                    : true
                            }
                        />
                    )}
                    <div className="transition-shapes">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className="background-transition-shapes"></div>
                        <div className="loading-screen">
                            Chargement <span>. </span>
                            <span>. </span>
                            <span>. </span>
                        </div>
                    </div>
                    {this.state.activePage === 'Question' && (
                        <Question
                            updateTransition={this.updateTransition}
                            updatePage={this.updatePage}
                            updateState={this.updateState}
                            state={this.state}
                        />
                    )}
                </div>
            </StateContext.Provider>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root-quiz'));
root.render(<AppQuiz />);
