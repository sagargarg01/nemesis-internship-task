import {
  InputAdornment,
  makeStyles,
  Select,
  TextField,
} from '@material-ui/core'
import React, { useState } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import countryCodes from '../../lib/CountryCodes.json'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles((theme) => ({
  mobileCountryCodeUI: {
    width: 'fit-content !important',
    maxWidth: 70,
    '& .MuiInput-root ': {
      width: 70,
    },

    '& .MuiInput-underline:before': {
      border: 0,
    },

    '& .MuiInput-underline:after': {
      border: 0,
    },

    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      border: 0,
    },
  },

  inputStyle: {
    '& .MuiOutlinedInput-inputAdornedStart': {
      paddingLeft: 14,
    },

    '& .MuiFormLabel-root.Mui-error': {
      color: '#f44336',
    },

    '& > .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#017374',
    },

    '& > .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '',
    },

    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f44336;',
    },

    '& .MuiInputBase-root': {
      caretColor: '#017374',
    },
  },
}))

function MobileNumberInput({
  mobileErrorText,
  mobileNumber,
  setMobileNumber,
  mobileCountryCode,
  setMobileCountryCode,
}) {
  const classes = useStyles()
  const [showSelect, setShowSelect] = useState(false)

  const onClose = () => setShowSelect(false)

  const blockSpecialCharacter = (e) => {
    let key = e.key
    let keyCharCode = key.charCodeAt(0)

    if (key === ' ') {
      return
    }
    // 0-9
    if (keyCharCode >= 48 && keyCharCode <= 57) {
      return key
    }

    e.preventDefault()
    return false
  }

  const changeHandler = (e) => {
    if (e.target.value.length > 10) {
      return
    }

    setMobileNumber(e.target.value)
  }

  return (
    <>
      <TextField
        error={Boolean(mobileErrorText)}
        helperText={mobileErrorText}
        InputLabelProps={{ required: false }}
        id='number'
        label='Phone Number'
        className={classes.inputStyle}
        variant='outlined'
        type='text'
        onKeyPress={blockSpecialCharacter}
        value={mobileNumber}
        onChange={changeHandler}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <Select
                onChange={(e) => setMobileCountryCode(e.target.value)}
                open={showSelect}
                onClose={onClose}
                style={{ width: 0, opacity: 0 }}
                value={mobileCountryCode}
              >
                {countryCodes.map((code) => (
                  <MenuItem key={code.code} value={code.dial_code}>
                    {code.name} {code.dial_code}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                variant='standard'
                value={mobileCountryCode}
                className={classes.mobileCountryCodeUI}
                onClick={() => setShowSelect(true)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <ArrowDropDownIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}

export default MobileNumberInput
