import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=19778f9f4f0792be9a88fbb6beab5332"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument