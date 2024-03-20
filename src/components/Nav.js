import whiteLogo from '../images/RiffRendezvous Logo (6).svg'
import colorLogo from '../images/outline_interpreter_mode_black_24dp.png'

// If minimal is false, we'll get the white logo. Or else, the black logo.
// We want the color logo if BG is white so that it contrasts & vice versa.
const Nav = ({ minimal, authToken }) => { 

    return (
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimal ? colorLogo : whiteLogo}/>
                {/* <h1 className="app-logo-name">RiffRendezvous</h1> */}
            </div>

            {!authToken && <button className="nav-button">Log In</button>}
        </nav>
    )
}
export default Nav