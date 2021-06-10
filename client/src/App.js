import React, { useContext, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { authContext } from './context/Auth'
import axios from 'axios'
//files
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import ProtectedRoute from './helpers/routes'
import Loader from './components/Loader/Loader'
import LandingPage from './components/LandingPage/LandingPage'
//function
function App() {
  let { auth, setAuth, setLoad, globalLoading } = useContext(authContext)

  useEffect(() => {
    const refreshUser = async () => {
      try {
        var config = {
          method: 'get',
          url: '/userdetails',
        }

        let response = await axios(config)
        console.log(response)
        if (response.data.success) {
          await setAuth({
            user: response.data.data,
            authenticated: true,
          })
          setLoad(false)
        }
      } catch (err) {
        console.log('e', err)
        setLoad(false)
      }
    }
    refreshUser()
  }, [])
  return (
    <>
      {globalLoading ? (
        <Loader />
      ) : (
        <>
          <Router>
            <Switch>
              <div>
                <Header />
                <Route exact path='/' component={LandingPage} />

                <ProtectedRoute exact path='/home' component={Home} />
              </div>
            </Switch>
          </Router>
        </>
      )}
    </>
  )
}

export default App
