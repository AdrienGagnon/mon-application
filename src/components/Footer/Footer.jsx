import './Footer.css';

import githubLogo from '../../assets/github-sign.png';
import linkedin from '../../assets/linkedin.png';
import email from '../../assets/email.png';

function Footer() {
    function handleClickGit() {
        window.location.href = 'https://github.com/AdrienGagnon';
    }

    function handleClickLinked() {
        window.location.href = 'https://linkedin.com/in/adrien-gagnon';
    }

    function handleClickEmail() {
        window.open('mailto: adrien.gagnon25@outlook.com');
    }

    return (
        <footer className="footer">
            <div className="footer-text">
                <div>Ce site a été conçu par Adrien Gagnon.</div>
                <div>Toutes les photos de paysages ont été prises par moi!</div>
            </div>
            <div className="plateformes">
                <p>Mes plateformes:</p>
                <ul className="plateformes-content">
                    <li>
                        <img
                            id="go-to-github-logo"
                            src={githubLogo}
                            alt=""
                            onClick={handleClickGit}
                        />
                        <a href="https://github.com/AdrienGagnon">GitHub</a>
                    </li>
                    <li>
                        <img
                            id="go-to-linkedin-logo"
                            src={linkedin}
                            alt=""
                            onClick={handleClickLinked}
                        />
                        <a href="https://linkedin.com/in/adrien-gagnon">
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <img
                            id="send-email-logo"
                            src={email}
                            alt=""
                            onClick={handleClickEmail}
                        />
                        <a href="mailto: adrien.gagnon25@outlook.com">Email</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
