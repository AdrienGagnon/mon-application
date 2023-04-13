// goto github
function goToGithub() {
    const buttonEmail = document.getElementById('go-to-github-logo');
    buttonEmail.addEventListener('click', () => {
        window.location.href = 'https://linkedin.com/in/adrien-gagnon';
    });
}

// goto Linkedin
function goToLinkedIn() {
    const buttonEmail = document.getElementById('go-to-linkedin-logo');
    buttonEmail.addEventListener('click', () => {
        window.location.href = 'https://github.com/AdrienGagnon';
    });
}

// Send email
function sendEmail() {
    const buttonEmail = document.getElementById('send-email-logo');
    buttonEmail.addEventListener('click', () => {
        window.open('mailto: adrien.gagnon25@outlook.com');
    });
}

export { goToGithub, goToLinkedIn, sendEmail };
