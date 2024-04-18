// App.js is the root component of the React app. It contains all other components. 
// It uses the BrowserRouter and Routes components from react-router-dom to manage the app's routing.
// The App component checks if the user is authenticated by checking if the AuthToken cookie is set.
// If the user is authenticated, it renders the Dashboard and Onboarding components. Otherwise, it renders the Home component.

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Onboarding from './pages/Onboarding'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']) 

  const authToken = cookies.AuthToken

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home/>}/>
          {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
          {authToken && <Route path="/onboarding" element={<Onboarding/>}/>}
      </Routes>
    </BrowserRouter>
  )
}

export default App
