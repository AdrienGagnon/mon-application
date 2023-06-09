import './Home.css';

import Header from './components/Header/Header';
import Section1 from './components/Section1/Section1';
import Section2 from './components/Section2/Section2';
import Section3 from './components/Section3/Section3';
import Section4 from './components/Section4/Section4';
import mouseBlob from './components/mouseBlob';
import waveMovement from './components/waveMovement';

import { useEffect } from 'react';

function HomePage() {
    document.body.classList = 'body-home';

    useEffect(() => {
        mouseBlob();
        waveMovement();
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
