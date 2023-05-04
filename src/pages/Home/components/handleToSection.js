function handleToSection() {
    const toInfos = document.querySelector('.to-section-infos');
    const toPhotos = document.querySelector('.to-section-photos');
    const toQuiz = document.querySelector('.to-section-quiz');
    const toContact = document.querySelector('.to-section-contact');
    const toTop = document.querySelector('.revenirTop');

    toInfos.addEventListener('click', function (e) {
        section1.scrollIntoView({
            behavior: 'smooth',
        });
    });

    toPhotos.addEventListener('click', function (e) {
        section2.scrollIntoView({
            behavior: 'smooth',
        });
    });

    toQuiz.addEventListener('click', function (e) {
        section3.scrollIntoView({
            behavior: 'smooth',
        });
    });

    toContact.addEventListener('click', function (e) {
        section4.scrollIntoView({
            behavior: 'smooth',
        });
    });

    toTop.addEventListener('click', function (e) {
        header.scrollIntoView({
            behavior: 'smooth',
        });
    });
}

export default handleToSection;
