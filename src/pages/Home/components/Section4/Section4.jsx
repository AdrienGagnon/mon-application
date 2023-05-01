import florenceRiver from '../../assets/florence-river.jpg';
import upArrow from '../../assets/up-arrow.png';
import upArrowFull from '../../assets/up-arrow-full.png';

import './Section4.css';

function Section4() {
    return (
        <section className="section" id="section4">
            <div className="section4-content">
                <div className="contact-container">
                    <h2>Contactez-moi!</h2>
                    <form
                        action="https://formsubmit.co/adrien.gagnon25@outlook.com"
                        method="POST"
                    >
                        <div className="form-contact-container">
                            <label htmlFor="name">Nom</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Votre nom..."
                                required
                            />
                            <label htmlFor="email">Adresse email</label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                placeholder="Adresse email..."
                                required
                            />
                            <label htmlFor="compagnie">Compagnie</label>
                            <input
                                id="compagnie"
                                type="text"
                                name="compagnie"
                                placeholder="Nom de la compagnie..."
                            />
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                type="text"
                                rows="5"
                                name="description"
                                placeholder="Écrivez votre message ici."
                                required
                            ></textarea>
                        </div>
                        <input
                            id="envoi-email"
                            type="hidden"
                            name="_next"
                            value=""
                        />
                        <button
                            className="submit-email"
                            type="submit"
                            value="Soumettre"
                        >
                            Soumettre
                        </button>
                    </form>
                </div>
                <img src={florenceRiver} alt="Florence, Italie" />
            </div>
            <button className="revenirTop">
                Vers le haut de la page
                <div>
                    <img className="toTop" src={upArrow} alt="" />
                    <img className="toTopFull" src={upArrowFull} alt="" />
                </div>
            </button>
        </section>
    );
}

export default Section4;
