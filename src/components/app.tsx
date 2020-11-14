import { Fragment, FunctionalComponent, h } from 'preact'
import { Route, Router, RouterOnChangeArgs } from 'preact-router'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/core'

import Home from '../routes/home'
import Profile from '../routes/profile'
import NotFoundPage from '../routes/notfound'
import theme from '../theme'

const App: FunctionalComponent = () => {
  let currentUrl: string
  const handleRoute = (e: RouterOnChangeArgs) => {
    currentUrl = e.url
  }

  return (
    <Fragment>
      <ColorModeScript initialColorMode="dark" />
      <ChakraProvider theme={theme}>
        <div id="app">
          <Router onChange={handleRoute}>
            <Route path="/" component={Home} />
            <Route path="/profile/" component={Profile} user="me" />
            <Route path="/profile/:user" component={Profile} />
            <NotFoundPage default />
          </Router>
        </div>
      </ChakraProvider>
    </Fragment>
  )
}

export default App
