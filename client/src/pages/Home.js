// The Home page is what anyone sees at any point in time, whether they're logged in or not
import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import { useState } from 'react'
import { useCookies } from 'react-cookie'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    // We set isSignUp to true by default b/c we assume that the user is trying to sign up
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const authToken = cookies.AuthToken // this is a piece of info that verifies the user's identity

    const handleClick = () => {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }
        setShowModal(true)
        setIsSignUp(true)
    }

    return(
        <div className="overlay">
            <Nav
                authToken={authToken}
                minimal={false} 
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignUp={setIsSignUp}
            />
            <div className="home">
                <h1 className="primary-title">Harmony's Just a Swipe Away!®</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Log Out' : 'Create Account'}
                </button>

                {/* Below lets us set state for showModal above from another component. If it's true, then we show the authModal */}
                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}

            </div>
        </div> 
    )
}
export default Home