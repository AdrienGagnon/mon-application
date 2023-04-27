import './Footer.css';

import githubLogo from '../../assets/github-sign.png';
import linkedin from '../../assets/linkedin.png';
import email from '../../assets/email.png';

function Footer() {
    return (
        <footer className="footer" id="footer-infos">
            <div className="footer-text">
                <div>Ce site a été conçu par Adrien Gagnon.</div>
                <div>Toutes les photos de paysages ont été prises par moi!</div>
            </div>
            <div className="plateformes">
                <p>Mes plateformes:</p>
                <ul className="plateformes-content">
                    <li>
                        <img id="go-to-github-logo" src={githubLogo} alt="" />
                        <a href="https://github.com/AdrienGagnon">GitHub</a>
                    </li>
                    <li>
                        <img id="go-to-linkedin-logo" src={linkedin} alt="" />
                        <a href="https://linkedin.com/in/adrien-gagnon">
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <img id="send-email-logo" src={email} alt="" />
                        <a href="mailto: adrien.gagnon25@outlook.com">
                            Send Email
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
