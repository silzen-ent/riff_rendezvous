import whiteLogo from '../images/RiffRendezvous Logo (6).svg'

// If minimal is false, we'll get the white logo. Or else, the black logo.
// We want the color logo if BG is white so that it contrasts & vice versa.
const Nav = ({ minimal, setShowModal, showModal, setIsSignUp }) => { 

    const handleClick = () => {
        setShowModal(true)
        // setIsSignUp is set to false b/c we're logging in. 
        setIsSignUp(false)
    }

    const authToken = false
    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={whiteLogo}/>
                {/* <h1 className="app-logo-name">RiffRendezvous</h1> */}
            </div>

            {!authToken && !minimal && <button
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
                
            >Log In</button>}
        </nav>
    )
}
export default Nav