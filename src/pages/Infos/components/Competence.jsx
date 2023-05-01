function Competence() {
    return (
        <div className="infos-section">
            <h1>Compétences</h1>
            <div className="competences">
                <div className="langages">
                    <h2>Langages maîtrisés</h2>
                    <div className="block">
                        <div className="langage">Python</div>
                        <div className="langage">JavaScript</div>
                        <div className="langage">HTML</div>
                        <div className="langage">CSS</div>
                    </div>
                </div>
                <div className="outils">
                    <h2>Outils utilisés</h2>
                    <div className="block">
                        <div className="outil">GitHub</div>
                        <div className="outil">VS Code</div>
                    </div>
                </div>
                <div className="concepts-autres">
                    <h2>Autres concepts familiers</h2>
                    <div className="block">
                        <div className="concept">React</div>
                        <div className="concept">Three.js</div>
                        <div className="concept">AJAX</div>
                        <div className="concept">Node.js</div>
                    </div>
                </div>
            </div>
            <div className="langues">
                <div className="langue">
                    <h2>Français:</h2>
                    <div className="cercles-langues"></div>
                </div>
                <div className="langue">
                    <h2>Anglais:</h2>
                    <div className="cercles-langues anglais"></div>
                </div>
            </div>
        </div>
    );
}

export default Competence;
