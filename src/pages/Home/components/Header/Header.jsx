import lecco480w from '../../assets/lecco/lecco-adrien-480w.jpg';
import lecco768w from '../../assets/lecco/lecco-adrien-768w.jpg';
import lecco1400w from '../../assets/lecco/lecco-adrien-1400w.jpg';
import { useRef, useState } from 'react';

import './Header.css';

function Header() {
    const imgLecco = useRef();
    const [loaded, setLoaded] = useState(false);

    return (
        <header className="container" id="header">
            <div className="blob-page">
                <div className="shape-blob"></div>
                <div className="shape-blob one"></div>
                <div className="shape-blob two"></div>
                <div className="shape-blob three"></div>
                <div className="shape-blob four"></div>
                <div className="shape-blob five"></div>
                <div className="shape-blob six"></div>
                <div className="shape-blob seven"></div>
                <div className="shape-blob eight"></div>
                <div className="shape-blob nine"></div>
                <div className="shape-blob ten"></div>
            </div>
            <div className="blob">
                {!loaded && (
                    <img
                        ref={imgLecco}
                        id="welcome-img-lecco-low"
                        src={lecco480w}
                    />
                )}
                <img
                    ref={imgLecco}
                    id="welcome-img-lecco"
                    className={loaded ? '' : 'welcome-img-loading'}
                    src={lecco768w}
                    srcSet={`${lecco480w} 480w, ${lecco768w} 768w, ${lecco1400w} 1400w `}
                    sizes="(max-width: 600px) 480px, (max-width: 1000px) 768px,
            1400px"
                    onLoad={() => setLoaded(true)}
                />
            </div>
            <div className="text-block">
                <h1 className="welcome-message">
                    Bienvenue dans mon site Internet!
                </h1>
                <p className="welcome-description">
                    Ce site sert à montrer mes connaissances en développement
                    web. Il contient une section{' '}
                    <a className="to-section-infos">information</a> pour en
                    apprendre davantage sur moi, une section de{' '}
                    <a className="to-section-photos">photos</a> et une section
                    de <a className="to-section-quiz">quiz</a>! Vous pouvez me
                    contacter <a className="to-section-contact">ici!</a>
                </p>
            </div>
        </header>
    );
}

export default Header;
