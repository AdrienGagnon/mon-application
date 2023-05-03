function handleDeleteResultat(index, liste, setListe) {
    const newList = liste.filter((_, i) => {
        return i !== index;
    });
    localStorage.setItem('Resultats', JSON.stringify(newList));

    setListe(newList);
}

export default handleDeleteResultat;
