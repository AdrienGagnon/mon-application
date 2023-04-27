'use strict';

import ReactDOM from 'react-dom/client';
import React, { Component, createContext } from 'react';

export const StateContext = createContext(null);

class QuizApp extends Component {
    state = {
        activePage: 'MenuSelection',
        activeState: '',
        sujet: '',
        choixReponse: '',
        mode: '',
        nombre: 5,
        transitionToQuiz: false,
        transitionToMenu: false,
        loaded: false,
        fadeOut: false,
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

    updateLoaded() {
        this.setState(() => ({ fadeOut: true }));
        setTimeout(() => {
            this.setState(() => ({ loaded: true }));
        }, 1000);
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

    updateTransitionMenu = newActiveState => {
        // active page
        this.setState(() => ({
            transitionToMenu: newActiveState,
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
                            updateTransitionMenu={this.updateTransitionMenu}
                            updatePage={this.updatePage}
                            updateState={this.updateState}
                            updateModeQuiz={this.updateModeQuiz}
                            state={this.state}
                            updateLoaded={this.updateLoaded.bind(this)}
                        />
                    )}
                    <div className="transition-shapes-container right hidden-shapes">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className="background-transition-shapes"></div>
                        <div className="loading-screen-transition">
                            Chargement <span>. </span>
                            <span>. </span>
                            <span>. </span>
                        </div>
                    </div>
                    {this.state.activePage === 'Question' && (
                        <Question
                            updateTransition={this.updateTransition}
                            updateTransitionMenu={this.updateTransitionMenu}
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

export default QuizApp;
