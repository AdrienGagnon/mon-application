function TransitionScreen() {
    return (
        <div className="transition-shapes-container right hidden-shapes">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className="background-transition-shapes"></div>
            <div className="loading-screen-transition">
                Chargement <span>. </span>
                <span>. </span>
                <span>. </span>
            </div>
        </div>
    );
}

export default TransitionScreen;
