import nombreMaxEssais from '../Logic/nombreMaxEssais';

// Affiche le nombre d'essais
function AfficherEssais(props) {
    return (
        <>
            {props.score.essais} / {nombreMaxEssais(props.parametres)} essais
        </>
    );
}

export default AfficherEssais;
