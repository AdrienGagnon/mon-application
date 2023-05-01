function sendEmail() {
    const buttonEmail = document.getElementById('envoi-email-button');
    buttonEmail.addEventListener('click', () => {
        window.open('mailto: adrien.gagnon25@outlook.com');
    });
}

export default sendEmail;
