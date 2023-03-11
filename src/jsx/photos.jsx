'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        // return e(
        //     'button',
        //     { onClick: () => this.setState({ liked: true }) },
        //     'Like'
        // );
        return (
            <button onClick={() => this.setState({ liked: true })}>Like</button>
        );
    }
}

const domContainer = document.querySelector('#react-page');
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
