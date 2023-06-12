function slidingSection(section, classname, threshold) {
    const slidingShapes = function (entries) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        entries[0].target.classList.remove(classname);
    };

    // Call the revealSection function when intersecting
    const sectionObserver = new IntersectionObserver(slidingShapes, {
        root: null,
        threshold: threshold,
    });

    // Adding the hidden class to the sections
    const observeSection = function (section) {
        sectionObserver.observe(section);
    };

    observeSection(section);
}

export default slidingSection;
