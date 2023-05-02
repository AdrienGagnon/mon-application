import './VideoPiano.css';

function VideoPiano() {
    const listeSources = [
        {
            name: 'video-ambiance',
            source: 'https://www.youtube.com/embed/9NryGfikwlA',
        },
        {
            name: 'video-gaspard',
            source: 'https://www.youtube.com/embed/WFdy4j1IV34',
        },
        {
            name: 'video-rach',
            source: 'https://www.youtube.com/embed/51sWBYVdGbs',
        },
    ];
    return (
        <div className="videos-piano-container">
            {listeSources.map(source => {
                return (
                    <div
                        key={source.name}
                        className="video-piano"
                        id={source.name}
                    >
                        <iframe
                            src={source.source}
                            title="Ambiance"
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                );
            })}
        </div>
    );
}

export default VideoPiano;
