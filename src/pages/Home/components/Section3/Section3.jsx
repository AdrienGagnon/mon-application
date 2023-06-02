import './Section3.css';

import Section3Svg from './Section3Svg';
import QuizCard from './QuizCard';
import PhotosCard from './PhotosCard';

function Section3() {
    return (
        <section className="section" id="section3">
            <PhotosCard />
            <QuizCard />
            <Section3Svg />
        </section>
    );
}

export default Section3;
