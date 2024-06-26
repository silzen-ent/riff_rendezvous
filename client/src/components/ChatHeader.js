import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import logoutButton from '../images/logout_icon2_white.png'


// This component will display the user's profile pic, username, & a logout button. 
const ChatHeader = ({ user }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const navigate = useNavigate()

    const logout = () => {
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        navigate('/')
        window.location.reload()
    }

    return (
        <div className="chat-container-header">
 
            <div className="profile">
                <div className="img-container">
                    <img src={user.url} alt={"photo of " + user.first_name} />
                </div>
                <h3 className="profile-name">{user.first_name}</h3>
            </div>
            <i className="log-out-icon" onClick={logout} alt=''>
                <img src={logoutButton}/>
                {/* ⇦ */}
            </i>
        </div>
    )
}

export default ChatHeader