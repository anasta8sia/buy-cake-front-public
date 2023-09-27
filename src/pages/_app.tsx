import type { AppProps } from 'next/app';

import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';

import '../../styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Layout>
      <main>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </main>
    </Layout>
  </>
);

export default App;
