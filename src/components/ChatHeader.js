import logoutButton from '../images/logout.png'

// This component will display the user's profile pic, username, & a logout button. 
const ChatHeader = () => {
    return (
        <div className="chat-container-header">
 
            <div className="profile">
                <div className="img-container">
                    <img src=""/>
                </div>
                <h3>Username</h3>
            </div>
            <i className="log-out-icon">
                {/* <img src={logoutButton}/> */}
                ⇦
            </i>
        </div>
    )
}

export default ChatHeader