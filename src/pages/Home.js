// The Home page is what anyone sees at any point in time, whether they're logged in or not

import Nav from '../components/Nav'

const Home = () => {
    
    const authToken = false // this is a piece of info that verifies the user's identity

    const handleClick = () => {
        console.log('clicked')
    }

    return(
        <>
        <Nav/> 
        <div className="home">
            <h1>Harmony's Just a Swipe Away!®</h1>
                {/* <h2>Connect</h2>
                <h2>Chat</h2> 
                <h2>Collaborate</h2> */}
            <button className="primary-button" onClick={handleClick}>
                {authToken ? 'Log Out' : 'Create Account'}
            </button>
        </div>
        </>
    )
}
export default Home