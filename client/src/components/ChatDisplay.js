import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'
import {useState, useEffect} from 'react'

// This component shows all the chats the user has with their "matchees". 
const ChatDisplay = ({user, clickedUser}) => {
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [usersMessages, setUsersMessages] = useState(null) 
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: {userId: userId, correspondingUserId: clickedUserId}
            })
            setUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: {userId: clickedUserId, correspondingUserId: userId}
            })
            setClickedUsersMessages(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getUsersMessages()
        getClickedUsersMessages()
    }, [])  

    const messages = []

    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })


    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

    return (
        <>
        {/* Chat component lets the user see all the chats  */}
        <Chat descendingOrderMessages={descendingOrderMessages} />
        {/* ChatInput component lets a user write messages in a little text box */}
        <ChatInput
            user={user}
            clickedUser={clickedUser} 
            getUsersMessages={getUsersMessages} 
            getClickedUsersMessages={getClickedUsersMessages}
        />
        </>
    )
}

export default ChatDisplay  