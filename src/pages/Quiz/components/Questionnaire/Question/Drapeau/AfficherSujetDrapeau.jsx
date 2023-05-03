import './AfficherSujetDrapeau.css';

// Si sujet drapeau, affiche svg du drapeau et le titre
function AfficherSujetDrapeau(props) {
    if (props.activeCountry === '') {
        return;
    }

    return (
        <div className="question-drapeau-container">
            <img
                className="question-drapeau"
                src={props.activeCountry.flags.svg}
                alt=""
            />
        </div>
    );
}

export default AfficherSujetDrapeau;
