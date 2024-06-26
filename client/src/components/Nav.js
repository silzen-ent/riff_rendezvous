import whiteLogo from '../images/RiffRendezvous Logo (6).svg';

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => { 

    const handleClick = () => {
        setShowModal(true);
        // setIsSignUp is set to false b/c we're logging in. 
        setIsSignUp(false);
    };

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={whiteLogo} alt="logo"/>
                {/* <h1 className="app-logo-name">RiffRendezvous</h1> */}
            </div>

            {!authToken && !minimal && ( 
            <button
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
                
            >Log In</button>)}
        </nav>
    );
};
export default Nav