function handleToSection(section) {
    switch (section) {
        case 'top':
            document.querySelector('header').scrollIntoView({
                behavior: 'smooth',
            });
            break;
        case 'information':
            document.querySelector('#section1').scrollIntoView({
                behavior: 'smooth',
            });
            break;
        case 'portfolio':
            document.querySelector('.portfolio-title').scrollIntoView({
                behavior: 'smooth',
            });
            break;
        case 'photos':
        case 'quiz':
            document.querySelector('.half-content-container').scrollIntoView({
                behavior: 'smooth',
            });
            break;
        case 'contact':
            document.querySelector('#section4').scrollIntoView({
                behavior: 'smooth',
            });
            break;
    }
}

export default handleToSection;
