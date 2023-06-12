import { useEffect, useRef, useState } from 'react';

import './Section2.css';
import playlistManagerMenu from '../../assets/playlist-manager-menu.png';
import playlistManagerPlaylist from '../../assets/playlist-manager-playlist.png';
import playlistManagerPlaylistTracks from '../../assets/playlist-manager-playlist-tracks.png';
import slidingSection from '../slidingSection';

function Section2() {
    const img1 = useRef();
    const img2 = useRef();
    const img3 = useRef();
    const projectContainer1 = useRef();

    useEffect(() => {
        handleCountDown();
    }, []);

    useEffect(() => {
        if (!projectContainer1 && !projectContainer1.current) return;
        slidingSection(projectContainer1.current, 'hidden-project', 0.5);
    }, [projectContainer1]);

    function handleCarousel(e, automaticNewPosition = undefined) {
        const newActive = e?.target;

        const isItem = newActive?.closest('.carousel-img');
        if ((!isItem || isItem?.dataset.pos === 0) && !automaticNewPosition)
            return;
        const elems = new Array(img1.current, img2.current, img3.current);
        let newActivePos;
        if (automaticNewPosition) {
            newActivePos = automaticNewPosition;
        } else {
            newActivePos = newActive.dataset.pos;
        }

        elems.forEach(item => {
            if (!item) return;
            const itemPos = item.dataset.pos;
            item.dataset.pos = getPos(itemPos, newActivePos);
        });
    }

    function getPos(current, newActivePos) {
        const diff = current - newActivePos;

        if (Math.abs(current - newActivePos) > 1) {
            return -current;
        }

        return diff;
    }

    function handleToWebsite(adress) {
        window.location.href = adress;
    }

    function handleCountDown() {
        window.clearTimeout;
        window.setTimeout(() => {
            if (!img1.current) return;
            handleCarousel(undefined, -1);
            handleCountDown();
        }, 10000);
    }

    return (
        <section className="section" id="section2">
            <h2 className="neon-tile portfolio-title">Portfolio</h2>
            <div
                ref={projectContainer1}
                className="contenu project-container hidden-project"
            >
                <h3 className="project-title">Playlist Manager</h3>
                <div className="project-content">
                    <div
                        onClick={e => handleCarousel(e)}
                        className="carousel-container"
                    >
                        <img
                            ref={img1}
                            className="carousel-img"
                            src={playlistManagerPlaylist}
                            alt="playlist-manager-playlist"
                            data-pos="-1"
                        />
                        <img
                            ref={img2}
                            className="carousel-img"
                            src={playlistManagerMenu}
                            alt="playlist-manager-menu"
                            data-pos="0"
                        />
                        <img
                            ref={img3}
                            className="carousel-img"
                            src={playlistManagerPlaylistTracks}
                            alt="playlist-manager-playlist-tracks"
                            data-pos="1"
                        />
                    </div>
                    <div className="description-container">
                        <p className="description-text">
                            <span>
                                Voici un clone de l'application pour Desktop de
                                <span> Spotify</span> fait entièrement par moi.
                                Il fait appel à l'API de Spotify et vous permet
                                de vous connecter avec votre propre compte
                                Spotify pour écouter vos listes de lecture
                                favorites.
                            </span>
                        </p>
                        <button
                            onClick={() =>
                                handleToWebsite(
                                    'https://playlist-manager-ag.netlify.app'
                                )
                            }
                            className="link-website-btn"
                        >
                            Visiter le site
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section2;
