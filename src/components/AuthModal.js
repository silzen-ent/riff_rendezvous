import { useState } from 'react'

// We're going to have the btn in the Nav & Homepage decide whether we show the AuthModal or not
const AuthModal = ({ setShowModal, isSignUp }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmedPassword, setConfirmedPassword] = useState(null)
    const [error, setError] = useState(null) 

    console.log(email, password, confirmedPassword)


    const handleClick = () => {
        setShowModal(false)
    }
    // This FN will handle form submission, & prevent page from refreshing. 
    // Also handles Error Handling & Input Validation in JS
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            // If the user is trying to sign up, pw's need to match
            if(isSignUp && (password !== confirmedPassword)) {
                // If they don't, we'll set an error message
                setError('Passwords need to match!')
            }
            // Otherwise, we'll make a post request to our database
            console.log('make a post request to our database')
        } catch (error) {
            console.log(error)
        }
    } 


    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}> 
                {/* If user is signing up, we need to see the below 2 input fields */}
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* If user is just logging in, we only need the input field below */}
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>

            </form>
            <hr/>
            <h2>GET THE APP</h2>
            
        </div>
    )
}
export default AuthModal