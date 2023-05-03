import handleSubmit from './handleSubmit';
import handleOnChange from './handleOnChange';

function FormParameters(props) {
    return (
        <div className="form-container-quiz">
            <div className="form-choose-quiz">
                {/* information donnee */}
                <label htmlFor="information">Information donnée:</label>
                <select
                    id="information"
                    name="information"
                    type="text"
                    onChange={e =>
                        handleOnChange(
                            e,
                            props.selectedParameters,
                            props.setSelectedParameters
                        )
                    }
                    defaultValue={props.selectedParameters.sujet}
                >
                    <option value="au drapeau">Drapeau</option>
                    <option value="à la capitale">Capitale</option>
                    <option value="au lieu géographique">
                        Lieu géographique
                    </option>
                </select>

                {/* information a donner */}
                <label htmlFor="reponse">À répondre:</label>
                <select
                    id="reponse"
                    name="reponse"
                    type="text"
                    onChange={e =>
                        handleOnChange(
                            e,
                            props.selectedParameters,
                            props.setSelectedParameters
                        )
                    }
                    defaultValue={props.selectedParameters.choixReponse}
                >
                    <option value="le nom du pays">Nom du pays</option>
                    <option value="la capitale">Capitale</option>
                    <option value="le drapeau">Drapeau</option>
                </select>

                {/* mode reponse */}
                <label htmlFor="mode">Mode de réponse:</label>
                <select
                    id="mode"
                    name="mode"
                    type="text"
                    onChange={e =>
                        handleOnChange(
                            e,
                            props.selectedParameters,
                            props.setSelectedParameters
                        )
                    }
                    defaultValue={props.selectedParameters.mode}
                >
                    <option value="choix">Choix de réponse</option>
                    <option value="aucun choix">Aucun choix de réponse</option>
                </select>

                {/* nombre de questions */}
                <label htmlFor="nombre">Nombre de questions:</label>
                <select
                    id="nombre"
                    name="nombre"
                    type="text"
                    onChange={e =>
                        handleOnChange(
                            e,
                            props.selectedParameters,
                            props.setSelectedParameters
                        )
                    }
                    defaultValue={props.selectedParameters.mode}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>
            <p className="error-message-selection hidden-text-selection">
                Ces paramètres sont incompatibles. Veuillez en sélectionner
                d'autres.
            </p>
            <button
                className="submitQuizParameters"
                type="button"
                name="Commencer le quiz"
                onClick={() =>
                    handleSubmit(props.selectedParameters, props.quizContext)
                }
            >
                Commencer le quiz
            </button>
        </div>
    );
}

export default FormParameters;
