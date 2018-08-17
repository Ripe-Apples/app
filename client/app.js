import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="body-top view-padding">
        <Routes />
      </div>
    </div>
  )
}

export default App
