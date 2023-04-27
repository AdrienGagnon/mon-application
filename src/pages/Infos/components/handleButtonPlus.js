function handleButtonPlus() {
    const sectionsCachees = document.querySelectorAll('.experience');
    const button = document.querySelector('.button-plus');

    function handleClick() {
        sectionsCachees.forEach(section => {
            section.classList.toggle('hide-section-experience');
        });
        button.textContent = button.textContent === 'Plus' ? 'Moins' : 'Plus';
    }

    button.addEventListener('click', e => handleClick(e));
}

export default handleButtonPlus;
