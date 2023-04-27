function waveMovement() {
    const sectionBottom = document.querySelectorAll('.section-bottom');
    const sectionTop = document.querySelectorAll('.section-top');

    // Sliding sections 1 and 3
    const slidingShapes = function (entries) {
        const [entry] = entries;
        if (!entry.isIntersecting) {
            const shapeSVG = entry.target.querySelectorAll('.shape');
            shapeSVG.forEach(el => el.classList.add('section--hidden'));
        } else {
            const shapeSVG = entry.target.querySelectorAll('.shape');
            shapeSVG.forEach(el => el.classList.remove('section--hidden'));
        }
    };

    // Call the revealSection function when intersecting
    const sectionObserver = new IntersectionObserver(slidingShapes, {
        root: null,
        threshold: 0.5,
    });

    // Adding the hidden class to the sections
    const observeSection = function (sections) {
        const allSections = [
            sections[0][0],
            sections[0][1],
            sections[1][0],
            sections[1][1],
        ];
        allSections.forEach(section => {
            const shapeSVG = section.querySelectorAll('.shape');
            shapeSVG.forEach(el => el.classList.add('section--hidden'));
            sectionObserver.observe(section);
        });
    };

    observeSection([sectionBottom, sectionTop]);
}

export default waveMovement;
