import ReactDOM from 'react-dom/client';
import React, { Component, createContext } from 'react';

import './Quiz.css';

import MenuSelection from './MenuSelection';
import Question from './Question';
import TransitionScreen from './components/TransitionScreen';

import ToggleMenu from '../../components/ToggleMenu/ToggleMenu';

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

    handleToggleMenu(e) {
        e.target.closest('#menu-toggle').classList.toggle('open');
        document.querySelector('nav').classList.toggle('open');
    }

    render() {
        document.body.classList = 'body-quiz';
        return (
            <>
                <ToggleMenu handleToggleMenu={e => this.handleToggleMenu(e)} />
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
                        <TransitionScreen />
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
            </>
        );
    }
}

export default QuizApp;
