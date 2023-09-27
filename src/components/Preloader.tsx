import { FC } from 'react';
import styles from '../../styles/preloader.module.scss';

interface PreloaderPropsInterface {
  preload: boolean;
}

const Preloader: FC<PreloaderPropsInterface> = ({ preload }: PreloaderPropsInterface) => {
  const classes = [styles.preloaderContainer];

  classes.push(preload ? styles.preloading : styles.postloading);

  return (
    <div className={classes.join(' ')}>
      <div className={styles.preloader}>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default Preloader;
