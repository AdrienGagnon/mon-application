function handleVideoMouseOver() {
    const videos = document.querySelectorAll('.video-piano');
    function zoomInVideo(e) {
        e.target.classList.add('zoomInVideo');
    }

    function zoomOutVideo(e) {
        e.target.classList.remove('zoomInVideo');
    }

    videos.forEach(video => {
        video.addEventListener('mouseenter', e => zoomInVideo(e));
        video.addEventListener('mouseleave', e => zoomOutVideo(e));
    });
}

export default handleVideoMouseOver;
