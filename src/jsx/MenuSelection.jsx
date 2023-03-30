'use strict';

import React, { Component } from 'react';
import rotatingEarth from './rotating-earth.mp4';

export default function MenuSelection() {
    const handleSubmit = e => {
        console.log(e);
    };

    return (
        <div className="menu-selection-page">
            <video className="earth-rotating-video" autoPlay muted loop>
                <source src={rotatingEarth} type="video/mp4"></source>
            </video>
            <div className="options-selection-container">
                <h1>Sélectionnez vos paramètres de quiz</h1>
                <p>Vous pourrez changer le style de question à tout moment</p>
                <form className="form-choose-quiz" onSubmit={handleSubmit}>
                    <label htmlFor="subject">Le quiz portera sur:</label>
                    <select id="subject" name="subject" type="text">
                        <option value="drapeaux">Les drapeaux</option>
                        <option value="capitales">Les capitales</option>
                    </select>
                    <label htmlFor="subject">
                        Vous répondrez de la façon suivante:
                    </label>
                    <select name="cars" id="cars">
                        <option value="choix">Choix de réponse</option>
                        <option value="direct">Aucun choix de réponse</option>
                    </select>

                    <button>Commencer le quiz</button>
                </form>
            </div>
        </div>
    );
}
