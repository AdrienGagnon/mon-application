import fastForward from '../assets/fast-forward.png';

import './Formation.css';

function Formation() {
    const experience = [
        {
            poste: 'Stagiaire en recherche',
            date: 'Été 2022',
            description:
                'Recherche sur les protéines Fur dans des bactéries E.Coli.',
            lieu: 'Commissariat à l’Énergie Atomique, Grenoble, France',
        },
        {
            poste: 'Stagiaire en recherche en chimie organique',
            date: 'Hiver 2021',
            description:
                'Synthèse, purification et analyse de diverses molécules complexes.',
            lieu: 'OmegaChem, Lévis',
        },
        {
            poste: 'Stagiaire en synthèse de peptides',
            date: 'Automne 2021',
            description:
                'Synthèse de peptides avec un synthétiseur automatique Symphony-X.',
            lieu: 'Institut de pharmacologie de Sherbrooke (IPS)',
        },
        {
            poste: 'Stagiaire en électrochimie',
            date: 'Été 2020',
            description:
                'Optimisation d’une synthèse de matériaux cathodiques de type NMC et assemblage de piles boutons pour évaluer les performances du matériau.',
            lieu: 'Laboratoire de la Pre. Gessie Brisard, Université de Sherbrooke',
        },
    ];

    return (
        <div className="infos-section" id="formation">
            <h1>Formation</h1>
            <ul className="formation-description">
                <div className="etude">
                    <p>Baccalauréat en chimie</p>
                    <p>2019-2022</p>
                    <p>Régime coopératif</p>
                    <p>Université de Sherbrooke</p>
                </div>
                <div className="etude">
                    <p>Diplôme d’études collégiales</p>
                    <p>2017-2019</p>
                    <p>Sciences, Lettres et Arts</p>
                    <p>Cégep de Sherbrooke</p>
                </div>
            </ul>
            <h2>Expériences de travail</h2>
            <ul className="experiences">
                {experience.map((experience, index) => {
                    return (
                        <div
                            key={experience.date}
                            className={
                                index === 0 ? 'experience-un' : 'experience'
                            }
                        >
                            <div>
                                <img
                                    className="fast-forward-arrow"
                                    src={fastForward}
                                />
                                {experience.poste}
                            </div>
                            <p>{experience.date}</p>
                            <p>{experience.description}</p>
                            <p>{experience.lieu}</p>
                        </div>
                    );
                })}
                <button className="button-plus">Plus</button>
            </ul>
        </div>
    );
}

export default Formation;
