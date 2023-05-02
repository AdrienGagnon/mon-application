import next from '../assets/next.png';
import goToNext from '../utils/goToNext.js';

function NextArrows(props) {
    const arrowSpan = position => {
        return (
            <span
                className={
                    'arrow next ' +
                    (position === 'first' ? 'first-arrow' : 'second-arrow')
                }
            >
                <img src={next} alt="" />
            </span>
        );
    };

    return (
        <>
            <div
                onClick={e => goToNext('left', props.state, props.updateState)}
                className="arrows-wrapper arrows-left"
            >
                {arrowSpan('first')}
                {arrowSpan('second')}
            </div>
            <div
                onClick={e => goToNext('right', props.state, props.updateState)}
                className="arrows-wrapper arrows-right"
            >
                {arrowSpan('first')}
                {arrowSpan('second')}
            </div>
        </>
    );
}

export default NextArrows;
