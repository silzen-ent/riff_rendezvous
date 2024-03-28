// importing useState so we can save the state of the Chats
import { useState } from 'react'

const ChatInput = () => {
    const [textArea, setTextArea] = useState(null)
    return (
        <div className="chat-input">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondary-button">Submit</button>
        </div>
    )
}

export default ChatInput