import { NavLink } from 'react-router-dom';
import './MainNavigation.css';
import logoAdrien from '../../assets/logo-adrien.png';

function MainNavigation() {
    return (
        <nav>
            {/* <img className="logo" src={logoAdrien} alt="logo-adrien" /> */}
            <ul className="nav-links">
                <NavLink to="/" className={'menu-link nav-item'} end>
                    Menu principal
                </NavLink>
                <NavLink to="/infos" className={'info-link nav-item'} end>
                    Infos personnelles
                </NavLink>
                <NavLink to="/photos" className={'photos-link nav-item'} end>
                    Photos
                </NavLink>
                <NavLink to="/quiz" className={'quiz-link nav-item'} end>
                    Quiz
                </NavLink>
            </ul>
        </nav>
    );
}

export default MainNavigation;
