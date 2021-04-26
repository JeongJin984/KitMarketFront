import { wrapper } from '../store'

import 'bootstrap/dist/css/bootstrap.min.css'

import { CookiesProvider, withCookies } from "react-cookie"

function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export default wrapper.withRedux(withCookies(App))