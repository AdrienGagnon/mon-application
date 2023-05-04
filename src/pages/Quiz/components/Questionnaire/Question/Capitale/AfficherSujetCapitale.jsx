import cityScape from '../../../../assets/cityscape.png';
import './AfficherSujetCapitale.css';

// Si sujet capitale, affiche capitale et le titre
function AfficherSujetCapitale(props) {
    if (props.activeCountry === '') {
        return;
    }
    // const imageVille = require

    return (
        <div className="question-capitale-container">
            Nom de la capitale: <span>{props.activeCountry.capital}</span>
            <img src={cityScape} alt="" />
        </div>
    );
}

export default AfficherSujetCapitale;
