import { useRef, useEffect } from 'react';

import './Section3.css';

import Section3Svg from './Section3Svg';
import QuizCard from './QuizCard';
import PhotosCard from './PhotosCard';
import slidingSection from '../slidingSection';

function Section3() {
    const section3 = useRef();

    useEffect(() => {
        if (!section3 && !section3.current) return;
        slidingSection(section3.current, 'hidden-section');
    }, [section3]);

    return (
        <section
            ref={section3}
            className="section hidden-section"
            id="section3"
        >
            <PhotosCard />
            <QuizCard />
            <Section3Svg />
        </section>
    );
}

export default Section3;
