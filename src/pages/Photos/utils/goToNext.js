import { imageID } from '../assets';

function goToNext(direction, state, updateState) {
    let newImg = imageID[state.activeImg.id + (direction === 'left' ? -1 : 1)];
    if (newImg === undefined) {
        if (direction === 'left') {
            newImg = imageID[imageID.length - 1];
        } else {
            newImg = imageID[0];
        }
    }
    // Set the new image as active
    updateState(newImg);
}

export default goToNext;
