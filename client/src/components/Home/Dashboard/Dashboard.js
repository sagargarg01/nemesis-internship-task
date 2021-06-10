import React, { useContext, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PeopleIcon from '@material-ui/icons/People'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Header from '../../Header/Header'
import { useMediaQuery } from '@material-ui/core'
import { authContext } from '../../../context/Auth'
import Loader from '../../Loader/Loader'
import AllUsers from './UserDashboard/AllUsers'
import AddUsers from './UserDashboard/AddUsers'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    background: '#018786',
    color: 'white',
    width: drawerWidth,

    '& .MuiListItemIcon-root': {
      color: 'white',
    },

    '& .MuiDivider-root': {
      background: 'white',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),

    [theme.breakpoints.down(468)]: {
      padding: '24px 0px',
    },
  },
}))

function ResponsiveDrawer(props) {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedState, setSelectedState] = useState('addusers')
  const isMobile = useMediaQuery(theme.breakpoints.down(600))
  const { auth } = useContext(authContext)
  const { user = {} } = auth

  const handleDrawerToggle = () => {
    if (isMobile) setMobileOpen(!mobileOpen)
  }

  const RenderSelectedState = () => {
    switch (selectedState) {
      case 'allusers':
        return <AllUsers />

      case 'addusers':
        return <AddUsers />

      default:
        return <Loader />
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={() => setSelectedState('addusers')}>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary='Add Users' />
        </ListItem>
        <ListItem button onClick={() => setSelectedState('allusers')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='All Users' />
        </ListItem>
      </List>
      <Divider />
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header className={classes.appBar} />
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <RenderSelectedState />
      </main>
    </div>
  )
}

export default ResponsiveDrawer
