import React, { useContext } from 'react'
import Box from '@material-ui/core/Box'
import { authContext } from '../../context/Auth'
import { Redirect } from 'react-router-dom'

function LandingPage() {
  const { auth } = useContext(authContext)

  if (auth.authenticated) {
    return <Redirect to={{ pathname: '/home' }} />
  }
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      style={{
        minHeight: '100vh',
        fontSize: 50,
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      Nemesis Internship task <br />
      Login to continue
    </Box>
  )
}

export default LandingPage
