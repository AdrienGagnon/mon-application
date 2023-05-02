// Affiche la bonne reponse quand les essais sont ecoules ou la bonne reponse est donnee
function ReponseActuelle(props) {
    return (
        <div
            className={
                'reponse-actuelle ' +
                (props.activeState === 'repondreReussi'
                    ? 'bonne-reponse-text'
                    : 'mauvaise-reponse-text')
            }
        >
            <strong>
                {' '}
                {props.activeState === 'repondreReussi' ? (
                    <>
                        <div className="checkmark"></div> Bien joué!
                    </>
                ) : (
                    <>
                        <div className="crossmark"></div> Dommage!
                    </>
                )}
            </strong>{' '}
            Le pays en question était:{' '}
            <span> {props.activeCountry.translations.fra.common}</span>
        </div>
    );
}

export default ReponseActuelle;
