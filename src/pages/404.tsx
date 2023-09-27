import Head from 'next/head';

import styles from '../../styles/error.module.scss';

const ErrorPage = () => (
  <>
    <Head>
      <title>Ошибка</title>
    </Head>
    <div className={styles.error}>404 | Страницы не существует</div>
  </>
);

export default ErrorPage;
