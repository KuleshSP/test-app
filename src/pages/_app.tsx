import 'normalize.css';
import 'the-new-css-reset/css/reset.css';
import 'styles/globals.scss';
import 'api-mocks';
import type {AppProps} from 'next/app';
import Layout from 'features/Layout';

export default function App({Component, pageProps}: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
