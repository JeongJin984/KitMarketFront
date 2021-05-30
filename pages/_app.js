import { wrapper } from '../store';
import axios from 'axios';
import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import {loadUserRequest} from "../data/event/userEvent";


class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    const state = ctx.store.getState();
    const cookie = ctx.req ? ctx.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    if (
      !state.user.me &&
      (!ctx.pathname === '/login' || !ctx.pathname === '/signup')
    ) {
      ctx.store.dispatch(loadUserRequest());
    }

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        pathname: ctx.pathname,
      },
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(MyApp);
