// The Home page is what anyone sees at any point in time, whether they're logged in or not
import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import { useState } from 'react'

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    // We set isSignUp to true by default b/c we assume that the user is trying to sign up
    const [isSignUp, setIsSignUp] = useState(true)

    
    const authToken = false // this is a piece of info that verifies the user's identity

    const handleClick = () => {
        console.log('clicked')
        setShowModal(true)
        setIsSignUp(true)
    }

    return(
        <div className="overlay">
            {/* Change minimal below back to false when UI is complete */}
            {/* If minimal true, show black logo. ELIF false, show white logo */}
            <Nav minimal={false} 
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignUp={setIsSignUp}/>
            <div className="home">
                <h1 className="primary-title">Harmony's Just a Swipe Away!®</h1>
                    {/* <h2>Connect</h2>
                    <h2>Chat</h2> 
                    <h2>Collaborate</h2> */}
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'Log Out' : 'Create Account'}
                </button>

                {/* Below lets us set the state for showModal above from another component. If showModal is true, then we're going to show the authModal */}
                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}

            </div>
        </div> 
    )
}
export default Home