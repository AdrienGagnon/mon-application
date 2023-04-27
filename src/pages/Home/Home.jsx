import './index.css';

import Header from './components/Header';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import handleToSection from './components/handleToSection';
import mouseBlob from './components/MouseBlob';
import waveMovement from './components/waveMovement';
import slidingSection from './components/slidingSection';

import { useEffect } from 'react';

function HomePage() {
    document.body.classList = 'body-home';

    useEffect(() => {
        handleToSection();
        mouseBlob();
        waveMovement();
        // slidingSection(); if i have time
    }, []);

    return (
        <>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div className="ball"></div>
            <Header />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
        </>
    );
}

export default HomePage;
