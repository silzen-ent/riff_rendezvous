import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'


// We're going to have the btn in the Nav & Homepage decide whether we show the AuthModal or not
const AuthModal = ({ setShowModal, isSignUp }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmedPassword, setConfirmedPassword] = useState(null)
    const [error, setError] = useState(null) 
    const [cookies, setCookie, removeCookie] = useCookies(null)

    let navigate = useNavigate()

    console.log(email, password, confirmedPassword)

    const handleClick = () => {
        setShowModal(false)
    }
    // This FN will handle form submission, & prevents page from refreshing. 
    // Also handles Error Handling & Input Validation in JS
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // If the user is trying to sign up, pw's need to match
            if (isSignUp && (password !== confirmedPassword)) {
                // If they don't, we'll set an error message
                setError('Passwords need to match!')
                return
            }
            // Otherwise, we'll make a post request to our database
            // console.log('posting', email, password)
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })

            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201
            if (success && isSignUp) navigate ('/onboarding')
            if (success && !isSignUp) navigate ('/dashboard')

            window.location.reload()

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
                {/* If user is signing up, we need to see the 2 input fields below */}
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
                    placeholder="confirmed password"
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