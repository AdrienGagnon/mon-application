function viewCV() {
    const containerInfos = document.querySelector('.container-infos');
    const iframe = document.querySelector('.pdf-cv');
    const visionnerCV = document.getElementById('visionner-cv');
    const quiteCVView = document.querySelector('.quit-cv-view');

    const addCV = function () {
        iframe.classList.remove('hidden-cv');
        containerInfos.classList.add('blur-page');
        quiteCVView.classList.remove('hidden-cv');
    };

    const removeCV = function () {
        iframe.classList.add('hidden-cv');
        containerInfos.classList.remove('blur-page');
        quiteCVView.classList.add('hidden-cv');
    };

    const clickVisioPDf = function () {
        visionnerCV.addEventListener('click', function () {
            addCV();
            clickExitCV();
        });
        setTimeout(() => {
            quiteCVView.addEventListener('click', function () {
                exitCV();
            });
        }, 500);
    };

    const exitCV = function () {
        window.removeEventListener('mousedown', exitCV);
        removeCV();
    };

    const clickExitCV = function () {
        window.addEventListener('mousedown', exitCV);
    };

    clickVisioPDf();
}

export default viewCV;
