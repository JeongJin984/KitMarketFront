import { wrapper } from '../store'

import styled from 'styled-components'

import 'bootstrap/dist/css/bootstrap.min.css'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)