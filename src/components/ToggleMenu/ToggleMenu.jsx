function ToggleMenu({ handleToggleMenu }) {
    return (
        <a id="menu-toggle" className="open" onClick={e => handleToggleMenu(e)}>
            <span></span>
            <span></span>
            <span></span>
        </a>
    );
}

export default ToggleMenu;
