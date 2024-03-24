// This page is for users when they are logged in

// Imported a react component to make swipeable elements like in a swipe app 
import TinderCard from 'react-tinder-card'
import { useState } from 'react'
import ChatContainer from '../components/ChatContainer'

const Dashboard = () => {
    const characters = [
        {
          name: 'Richard Hendricks',
          url: 'https://i.imgur.com/Gg6BpGn.jpeg'
        },
        {
          name: 'Erlich Bachman',
          url: 'https://i.imgur.com/Gg6BpGn.jpeg'
        },
        {
          name: 'Monica Hall',
          url: 'https://i.imgur.com/Gg6BpGn.jpeg'
        },
        {
          name: 'Jared Dunn',
          url: 'https://i.imgur.com/Gg6BpGn.jpeg'
        },
        {
          name: 'Dinesh Chugtai',
          url: 'https://i.imgur.com/Gg6BpGn.jpeg'
        }
    ]
    // Below is saving the direction of the last swipe
    const [lastDirection, setLastDirection] = useState() 
  
    const swiped = (direction, nameToDelete) => {
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }

    return (
        <div className="dashboard">
            <ChatContainer/>
            <div className="swipe-container">
                <div className="card-container">

                    {characters.map((character) =>
                        <TinderCard 
                            className='swipe' 
                            key={character.name} 
                            // With onSwipe, we're logging the direction which then goes to the swiped FN & changes the last direction for us so we can see what the last swipe was
                            onSwipe={(dir) => swiped(dir, character.name)} 
                            onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
                                className='card'>
                            <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                    )}       
                    <div className="swipe-info">
                        {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>} 
                    </div> 

                </div>
            </div>
        </div>
    )
}
export default Dashboard