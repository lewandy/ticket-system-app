/* eslint-disable no-console */
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? console.log("pro")
      : console.log("dev")
  }