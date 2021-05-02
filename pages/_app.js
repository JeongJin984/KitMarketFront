import { wrapper } from '../store'

import 'bootstrap/dist/css/bootstrap.min.css'

import { CookiesProvider, withCookies } from "react-cookie"
import { loadUserRequest } from '../reducer/user';

function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, query }) => {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (req && cookie) {
      axios.defaults.headers.Cookie = cookie; // SSR일 때만 쿠키를 넣어줌
    }
    store.dispatch(loadUserRequest());
    store.dispatch(END); // Request가 끝날 때 까지 기다려줌
    await store.sagaTask.toPromise();
  }
);

export default wrapper.withRedux(withCookies(App))