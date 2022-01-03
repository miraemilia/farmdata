import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [ visible, setVisible ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="container">
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.openButtonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        <Button onClick={toggleVisibility}>{props.closeButtonLabel}</Button>
        {props.children}
      </div>
    </div>
  )

}

Togglable.displayName = 'Togglable'

export default Togglable