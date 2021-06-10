const sendTokenUser = (user, statusCode, res) => {
  // Create Jwt token
  const token = user.getJwtToken()

  // Options for cookie
  const options = {
    expires: new Date(Date.now() + 300000),
    httpOnly: true,
  }
  // res.cookie("token", token, options);
  // return res.status(statusCode).json({
  //   success: true,
  //   user,
  // });

  return res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    data: user,
  })
}

module.exports = sendTokenUser
