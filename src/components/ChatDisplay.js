import Chat from './Chat'
import ChatInput from './ChatInput'

// This component shows all the chats the user has with their "matchees". 
const ChatDisplay = () => {
    return (
        <>
        {/* Chat component lets the user see all the chats  */}
        <Chat/>
        {/* ChatInput component lets a user write messages in a little text box */}
        <ChatInput/>
        </>
    )
}

export default ChatDisplay