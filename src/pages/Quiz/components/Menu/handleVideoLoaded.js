function handleVideoLoaded(transitionState, setTransitionState) {
    setTransitionState({
        ...transitionState,
        fadeOut: true,
    });
    setTimeout(() => {
        setTransitionState({
            ...transitionState,
            loaded: true,
        });
    }, 1000);
}

export default handleVideoLoaded;
