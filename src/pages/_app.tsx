import 'normalize.css';
import 'styles/reset.scss';
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
