function handleOnChange(e, selectedParameters, setSelectedParameters) {
    setSelectedParameters({
        sujet:
            e.target.id === 'information'
                ? e.target.value
                : selectedParameters.sujet,
        choixReponse:
            e.target.id === 'reponse'
                ? e.target.value
                : selectedParameters.choixReponse,
        mode: e.target.id === 'mode' ? e.target.value : selectedParameters.mode,
        nombre:
            e.target.id === 'nombre'
                ? e.target.value
                : selectedParameters.nombre,
    });
}

export default handleOnChange;
