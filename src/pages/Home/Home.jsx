import './Home.css';

import Header from './components/Header/Header';
import Section1 from './components/Section1/Section1';
import Section2 from './components/Section2/Section2';
import Section3 from './components/Section3/Section3';
import Section4 from './components/Section4/Section4';
import mouseBlob from './components/mouseBlob';
import waveMovement from './components/waveMovement';
// import slidingSection from './components/slidingSection'; if i have time

import { useEffect } from 'react';

function HomePage() {
    document.body.classList = 'body-home';

    useEffect(() => {
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
