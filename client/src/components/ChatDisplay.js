import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import { useState, useEffect } from 'react'

// This component shows all the chats the user has with their "matchees". 
const ChatDisplay = ({user, clickedUser}) => {
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [usersMessages, setUsersMessages] = useState(null) 
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: {userId: userId, correspondingUserId: clickedUserId }
            })
            setUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getUsersMessages()
    }, [usersMessages])

    console.log(usersMessages)

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