const Hamburger = (props) => {
    return (
        <svg
            width={40}
            height={30}
            viewBox="0 0 40 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <title>{"Open Menu"}</title>
            <path fill="#1C1C17" d="M0 0h40v6H0zM0 12h40v6H0zM0 24h40v6H0z"/>
        </svg>
    )
}

export default Hamburger
