import React, { FC } from 'react';
import styles from '../../styles/error.module.scss';

const ErrorFallback: FC = () => (
  <div>
    <h2 className={styles.error}>Что-то пошло не так :(</h2>
  </div>
);

export default ErrorFallback;
