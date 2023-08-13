import Logo from '../assets/VentocsLogo.png'

function Header() {
    return (
        <>
        <section className="header">
        <div id="logo">
            <img src={Logo} alt="Brand" />
        </div>
        <div id="search">
            <input type="text" id="search-box" />
            <i className="fa fa-search icons" aria-hidden="true"></i>
            <i className="fa fa-microphone icons" aria-hidden="true" ></i>
            <a><i className="fa fa-filter icons" aria-hidden="true"></i></a>

        </div>
        <button id="connect-btn">Connect</button>
        
    
    </section>
    <hr />
    </>
    )
}

export default Header