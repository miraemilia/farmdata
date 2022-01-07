import React from 'react'

const Notification = ({ message, messageColor }) => {
  const notificationStyle = {
    color: messageColor
  }

  if (message === '') {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification