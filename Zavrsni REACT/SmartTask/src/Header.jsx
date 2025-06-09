function Header(props) {
    return (
        <header className="flex">
            <h2>SmartTask</h2>
            {props.children}
        </header>
    )
}

export default Header;