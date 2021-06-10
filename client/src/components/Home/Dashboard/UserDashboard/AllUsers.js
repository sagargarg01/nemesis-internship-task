import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../../../Loader/Loader'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    minWidth: 700,

    '& td': {
      wordBreak: 'break-word',
    },
  },

  icon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export default function AllUsers() {
  const [userList, setUserList] = useState([])
  const [loader, setLoader] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/users/getall',
    })
      .then((res) => {
        setUserList(res.data.data)
        setLoader(false)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleDeleteUser = (id) => {
    console.log(id)
    setLoader(true)
    axios({
      method: 'delete',
      url: `/users/deleteuser?id=${id}`,
    })
      .then((res) => {
        setUserList(res.data.data)
        setLoader(false)
      })
      .catch((err) => console.log(err))
  }

  if (loader) return <Loader />

  return (
    <div>
      <h3 style={{ marginBottom: 60 }}>All users</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell align='center'>Email</StyledTableCell>
              <StyledTableCell align='center'>Mobile</StyledTableCell>
              <StyledTableCell align='center'>Address</StyledTableCell>
              <StyledTableCell align='center'>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <StyledTableRow key={user.username}>
                <StyledTableCell component='th' scope='row'>
                  {user.username}
                </StyledTableCell>
                <StyledTableCell align='center'>{user.email}</StyledTableCell>
                <StyledTableCell align='center'>{user.mobile}</StyledTableCell>
                <StyledTableCell align='center'>{user.address}</StyledTableCell>
                <StyledTableCell align='center'>
                  <DeleteIcon
                    htmlColor='red'
                    className={classes.icon}
                    onClick={() => handleDeleteUser(user._id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
