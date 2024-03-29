// This page is for users when they are logged in
// Imported a react component to make swipeable elements like in a swipe app 
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState()   // This is saving the direction of the last swipe
  const [cookies, setCookie, removeCookie] = useCookies(['user'])


  // We're going to use the user's id to get their info from the database
  const userId = cookies.UserId
  // This FN will get the user's info from the DB using their id (which we get from the variable above)
  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: { gender: user?.gender_interest }
      })
      setGenderedUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getUser()
    getGenderedUsers()
  }, [user, genderedUsers])
  // }, [user, genderedUsers])

  console.log(genderedUsers)

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put('http://localhost:8000/addmatch', {
        userId,
        matchedUserId
      })
      getUser()
    } catch (error) {
      console.log(error)
    }
  }

  console.log(user)


  const swiped = (direction, swipedUserId) => {

    if (direction === 'right'){
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }



  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId)


  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
  )


  return (<>
    {user &&
    <div className="dashboard">
      <ChatContainer user={user}/>
      <div className="swipe-container">
        <div className="card-container">

          {filteredGenderedUsers?.map((genderedUser) =>
            <TinderCard
              className='swipe'
              key={genderedUser.first_name}
              // With onSwipe, we're logging the direction which then goes to the swiped FN & changes the last direction for us so we can see what the last swipe was
              onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
              onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
              <div style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
                className='card'>
                <h3>{genderedUser.first_name}</h3>
              </div>
            </TinderCard>
          )}
          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>

        </div>
      </div>
    </div>}
    </>
  )
}
export default Dashboard