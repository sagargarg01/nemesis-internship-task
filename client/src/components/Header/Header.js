import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HeaderDialog from '../LoginSignupDialog/Dialog'
import { Button } from '@material-ui/core'
import { authContext } from '../../context/Auth'
import MenuOverlay from './MenuOverlay'

const useStyles = makeStyles((theme) => ({
  root: {
    '& header': {
      background: '#018786',

      '& .MuiToolbar-root': {
        justifyContent: 'space-between',
      },
    },
  },

  Buttons: {
    display: 'flex',
    alignItems: 'center',

    '& .MuiButton-outlined': {
      color: 'white',
      borderColor: 'white',
      fontWeight: 400,
    },
  },
}))

export default function Header(props) {
  const classes = useStyles()
  const [openDilaog, setOpenDilaog] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { auth } = useContext(authContext)
  const [user, setUser] = useState('')

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleLoginClick = () => {
    setOpenDilaog(true)
  }

  const UserProfile = () => {
    return (
      <div className={classes.Buttons}>
        <IconButton
          aria-controls='primary-account-menu'
          aria-haspopup='true'
          color='inherit'
          onClick={handleProfileMenuOpen}
        >
          <AccountCircle />
        </IconButton>

        <MenuOverlay anchorEl={anchorEl} handleMenuClose={handleMenuClose} />
      </div>
    )
  }

  const LoginSignupButton = () => {
    return (
      <div className={classes.Buttons}>
        <Button variant='outlined' onClick={handleLoginClick}>
          Login
        </Button>
      </div>
    )
  }

  useEffect(() => {
    if (auth.authenticated) {
      setUser(auth.user)
    } else {
      setUser(null)
    }
  }, [auth])

  return (
    <div className={classes.root}>
      <AppBar position='fixed' {...props}>
        <Toolbar>
          <Typography variant='h5' noWrap>
            Internship Task
          </Typography>

          {auth.authenticated ? <UserProfile /> : <LoginSignupButton />}
          {/* <LoginSignupButton /> */}
        </Toolbar>
      </AppBar>

      <HeaderDialog open={openDilaog} onClose={() => setOpenDilaog(false)} />
    </div>
  )
}
