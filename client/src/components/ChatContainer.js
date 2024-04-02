import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import { useState } from 'react' 

// This component contains the ChatHeader, MatchesDisplay, & ChatDisplay components, which will be rendered to the Dashboard page.
const ChatContainer = ({ user }) => {
    const [clickedUser, setClickedUser] = useState(null) 

    // console.log('clickUser', clickedUser)

    return (
        <div className="chat-container">
            <ChatHeader user={user} />

            <div>
                {/* Two buttons: one to show a user's matches, & one to show chats. */}
                <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
                <button className="option" disabled={!clickedUser}>Chat</button>
            </div>

            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}

            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser} />}
        </div>
    )
}

export default ChatContainer