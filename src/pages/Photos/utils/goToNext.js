import { imageID } from '../assets';

function goToNext(direction, updateState) {
    let newImg =
        imageID[
            this.props.state.activeImg.id + (direction === 'left' ? -1 : 1)
        ];
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
