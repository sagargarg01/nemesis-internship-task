import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import MobileNumberInput from '../../../MobileNumberInput/MobileNumberInput'
import { authContext } from '../../../../context/Auth'

const useStyles = makeStyles((theme) => ({
  root: {
    '&': {
      width: '100%',
      maxWidth: 760,
    },

    '& .loginInputs': {
      display: 'grid',
      gridRowGap: 24,

      '& .multiLineInput': {
        '& .MuiFormControl-root': {
          width: '100%',
          height: 'auto',
          maxWidth: 762,

          '& .MuiOutlinedInput-multiline': {
            minHeight: 100,
            width: '-webkit-fill-available',
          },

          '& .MuiOutlinedInput-root': {
            height: 'inherit',
            padding: 15,
          },

          '& .MuiInputBase-root': {
            display: 'block',
          },
        },
      },
    },

    '& .MuiTextField-root': {
      width: '100%',
      maxWidth: 760,

      '& .MuiButtonBase-root': {
        color: 'rgba(0,0,0,0.6)',
      },
    },

    '& .MuiInputLabel-outlined': {
      color: 'rgba(0,0,0,0.6)',
    },

    '& .MuiFormLabel-root.Mui-error': {
      color: '#f44336',
    },

    '& .formFooter': {
      marginTop: 22,
      textAlign: 'center',
      color: 'rgba(0,0,0,0.6)',

      '& .logInButton': {
        width: '100%',
        maxWidth: 392,
        height: 48,
        background: '#017374',
        borderRadius: 4,
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '16px',
        letterSpacing: 1.25,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        boxShadow: 'none',
        margin: '6px 0px',

        [theme.breakpoints.down(1441)]: {
          margin: ' 18px 0px',
        },

        '&:hover': {
          background: '#026363',
        },

        '& .MuiCircularProgress-root': {
          height: '24px !important',
          width: '24px !important',
          color: '#FFFFFF',
        },
      },
    },
  },

  inputStyle: {
    '& > .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#017374',
    },

    '& > .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '',
    },

    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f44336;',
    },
  },

  header: {
    padding: 0,
  },

  formContainer: {
    overflowY: 'visible',
    padding: 0,
    marginTop: 32,
  },

  rootContainer: {
    margin: 'auto',
    width: 760,
  },
}))

export default function LoginForm({ onClose }) {
  const classes = useStyles()
  const { setSnack } = useContext(authContext)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [mobile, setMobile] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [address, setAddress] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')
  const [userNameErrorText, setUserNameErrorText] = useState('')
  const [mobileErrorText, setMobileErrorText] = useState('')
  const [addressErrorText, setAddressErrorText] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/
    if (emailRegex.test(email)) {
      return true
    } else {
      return false
    }
  }

  const handleInputs = () => {
    setUserName('')
    setEmail('')
    setMobile('')
    setAddress('')
    setUserNameErrorText('')
    setEmailErrorText('')
    setMobileErrorText('')
    setAddressErrorText('')
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (!email) setEmailErrorText('Field cannot be empty')
    if (!userName) setUserNameErrorText('Field cannot be empty')
    if (!mobile) setMobileErrorText('Field cannot be empty')
    if (!address) setAddressErrorText('Field cannot be empty')
    if (!email || !userName || !mobile || !address) return

    if (!validateEmail(email)) {
      setEmailErrorText('Please enter a valid email!')
      return
    }

    setLoading(true)

    axios({
      method: 'post',
      url: '/users/create',
      data: {
        email: email,
        username: userName,
        address: address,
        mobile: `${countryCode}${mobile}`,
      },
    })
      .then((res) => {
        console.log(res)
        handleInputs()
        setLoading(false)
        setSnack(res.data.message)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setSnack(err.response.data.message)
      })
  }

  const blockSpecialCharacter = (e) => {
    let key = e.key
    let keyCharCode = key.charCodeAt(0)

    // 0-9
    if (keyCharCode >= 48 && keyCharCode <= 57) {
      return key
    }
    // A-Z
    if (keyCharCode >= 65 && keyCharCode <= 90) {
      return key
    }
    // a-z
    if (keyCharCode >= 97 && keyCharCode <= 122) {
      return key
    }

    e.preventDefault()
    return false
  }

  return (
    <div className={classes.rootContainer}>
      <DialogTitle id='form-dialog-title' className={classes.header}>
        <div>Add User</div>
      </DialogTitle>
      <DialogContent className={classes.formContainer}>
        <form
          className={classes.root}
          autoComplete='off'
          onSubmit={submitHandler}
          noValidate
        >
          <div className='loginInputs'>
            <div className='inputContainer'>
              <TextField
                label='Username'
                error={Boolean(userNameErrorText)}
                helperText={userNameErrorText}
                variant='outlined'
                value={userName}
                className={classes.inputStyle}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={blockSpecialCharacter}
                required
                InputLabelProps={{ required: false }}
              />
            </div>

            <div className='inputContainer'>
              <MobileNumberInput
                mobileErrorText={mobileErrorText}
                mobileNumber={mobile}
                setMobileNumber={setMobile}
                mobileCountryCode={countryCode}
                setMobileCountryCode={setCountryCode}
              />
            </div>
            <div className='inputContainer'>
              <TextField
                label='Email'
                error={Boolean(emailErrorText)}
                helperText={emailErrorText}
                variant='outlined'
                type='email'
                value={email}
                className={classes.inputStyle}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputLabelProps={{ required: false }}
              />
            </div>
            <div className='multiLineInput coverFullWidthInput'>
              <TextField
                multiline
                label='Address'
                error={Boolean(addressErrorText)}
                helperText={addressErrorText}
                variant='outlined'
                className={classes.inputStyle}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                required
                InputLabelProps={{ required: false }}
              />
            </div>
          </div>

          <div className='formFooter'>
            <Button type='submit' className='logInButton' variant='contained'>
              {loading ? <CircularProgress /> : 'submit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </div>
  )
}
