import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 440,
    minWidth: 300,
    height: '100%',
    background: '#017374',
    padding: '52px 64px',
    boxSizing: 'border-box',
  },
}))

export default function Aside() {
  const classes = useStyles()

  return <div className={classes.root}></div>
}
