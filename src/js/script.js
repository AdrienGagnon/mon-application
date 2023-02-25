export const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('hidden');
    observer.unobserve(entry.target);
};
