import { Link } from 'react-router-dom';

import reactLogo from '../../assets/react.png';
import RotatingEarth from './Earth';

function QuizCard() {
    return (
        <>
            <div className="half-content-container">
                <RotatingEarth />
                <div className="section-description section3-description">
                    <h3>Quiz de géographie</h3>
                    <p>
                        Connaissez-vous bien votre <span>planète bleue?</span>{' '}
                        Voici un petit <span>quiz</span> pour tester vos
                        connaissances.
                    </p>
                    <Link to="/quiz" className="link-contact">
                        Cliquez ici pour commencer
                    </Link>
                    <div className="background-1"></div>
                    <div className="background-2"></div>
                </div>
            </div>
        </>
    );
}

export default QuizCard;
