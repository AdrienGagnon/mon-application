import badminton from '../assets/badminton.jpg';
import piano from '../assets/piano.jpg';

function Loisirs() {
    return (
        <div className="infos-section">
            <h1>Loisirs</h1>
            <div className="section-loisir badminton">
                <p>
                    J'aime faire du <span>sport</span>, en particulier le{' '}
                    <span>badminton</span>. J'ai fait de la{' '}
                    <span>compétition</span> pendant longtemps, notamment avec
                    les Volontaires du Cégep de Sherbrooke.
                </p>
                <img src={badminton} alt="" />
            </div>
            <div className="section-loisir piano">
                <p>
                    Je joue du <span>piano</span> depuis que j'ai 10 ans.
                    Ci-dessous, vous pourrez écouter une petite{' '}
                    <span>création</span> pour un projet de Cégep et deux{' '}
                    <span>interprétations</span> de pièces de Ravel et de
                    Rachmaninoff.
                </p>
                <img src={piano} alt="" />
            </div>
        </div>
    );
}

export default Loisirs;
