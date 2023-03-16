export default function Sidebar() {
    return (
        <div className="photo-container">
            <img
                className="img-preview"
                src={require('../img/photos-page/Amsterdam-canal.jpg')}
                alt="Amsterdam"
            />
            <div className="img-lieu">Amsterdam, Pays-Bas</div>
            <div className="img-description">
                Un magnifique canal au plein coeur d'Amsterdam
            </div>
        </div>
    );
}
