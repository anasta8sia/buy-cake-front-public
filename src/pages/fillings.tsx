import Head from 'next/head';
import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import { CakesFillingsInterface, dataService } from '../service/dataService';
import styles from '../../styles/fillings.module.scss';

export interface CakesFillingsPropsInterface {
  cakesFillings: CakesFillingsInterface[];
}
const CakesFillingsPage: FC<CakesFillingsPropsInterface> = () => {
  const [cakesFillings, setCakesFillings] = useState<CakesFillingsInterface[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataService.getCakesFillings();
      setCakesFillings(data);
    };

    fetchData().catch((e) => setError(e));
  }, []);

  const elements = cakesFillings.map((el, index) => {
    const url = `/imgFilling/${el.img}`;
    const idStr = el.id.toString();
    const name = el.name;

    const classes = [styles.fillingItem];
    const oddItem: boolean = (index % 2) !== 0;

    if (oddItem) {
      classes.push(styles.reverse);
    }

    return (
      <div
        className={classes.join(' ')}
        key={idStr}>
        <div
          className={styles.filingWrapper}>
          <Image
            className={styles.imgFilling}
            src={url}
            alt={name}
            width={350}
            height={350}>
          </Image>
        </div>
        <div
          className={styles.mainFilling}>
          <div
            className={styles.nameFilling}>
            {el.name}
          </div>
          <div
            className={styles.descriptionFilling}>
            {el.description}
          </div>
        </div>
      </div>
    );
  });

  if (error) {
    throw error;
  }

  return (
    <>
      <Head>
        <title>Начинки</title>
      </Head>
      <div className={styles.fillingsContainer}>{elements}</div>
    </>
  );
};

export default CakesFillingsPage;
