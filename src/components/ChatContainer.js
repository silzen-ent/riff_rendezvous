import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'

// This component contains the ChatHeader, MatchesDisplay, & ChatDisplay components, which will be rendered to the Dashboard page.
const ChatContainer = () => {
    return (
        <div className="chat-container">
            <ChatHeader/>

            <div>
                {/* Two buttons: one to show a user's matches, & one to show chats. */}
                <button className="option">Matches</button>
                <button className="option">Chat</button>
            </div>

            <MatchesDisplay/>

            <ChatDisplay/>
        </div>
    )
}

export default ChatContainer