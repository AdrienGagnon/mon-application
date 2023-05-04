function slidingSection() {
    const sections = document.querySelectorAll('section');

    // Sliding sections 1 and 3
    const slidingShapes = function (entries) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        const shapeSVG = entry.target.querySelectorAll('.shape');
        shapeSVG.forEach(el => el.classList.remove('section--hidden'));
    };

    // Call the revealSection function when intersecting
    const sectionObserver = new IntersectionObserver(slidingShapes, {
        root: null,
        threshold: 0.2,
    });

    // Adding the hidden class to the sections
    const observeSection = function (sections) {
        sections.forEach(section => {
            const sectionChildren = section.children;
            console.log(sectionChildren);
            Array.from(sectionChildren).forEach(el =>
                el.classList.add('hidden-section-home')
            );
            // sectionObserver.observe(section);
        });
    };

    observeSection(sections);
}

export default slidingSection;
