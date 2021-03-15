import { wrapper } from '../store'
import './app.css'

import 'bootstrap/dist/css/bootstrap.min.css'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App)