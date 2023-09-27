import Head from 'next/head';
import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import { CakesDataInterface, dataService } from '../service/dataService';
import { PAGE_SIZE, LOAD_DELAY } from '../constants';
import Preloader from '../components/Preloader';

import styles from '../../styles/cakeGallery.module.scss';

const HomePage: FC = () => {
  const [cakesData, setCakesData] = useState<{
    count: number;
    rows: CakesDataInterface[];
  }>({ count: 0, rows: [] });

  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      setTimeout(async () => {
        try {
          const data = await dataService.getCakes(page);

          setCakesData(() => ({
            count: data.count,
            rows: [...cakesData.rows, ...data.rows],
          }));
        } catch (e) {
          setError(e);
        }

        setLoading(false);
      }, LOAD_DELAY);
    };

    fetchData();
  }, [page]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      const pages = Math.ceil(cakesData.count / PAGE_SIZE);

      if (pages > page) {
        setPage(page + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cakesData.rows]);

  const elements = cakesData.rows.map((el, idx) => {
    const url = `/imgCake/${el.img}`;
    const idStr = el.id.toString();
    const name = el.name;

    return (
      <div
        className={styles.cakeContainer}
        key={idStr}>
        <Image
          className={styles.cakeItem}
          id={idStr}
          src={url}
          alt={name}
          width={450}
          height={450}
          priority={idx < PAGE_SIZE}
        >

        </Image>
      </div>

    );
  });

  const isItemsEmpty = cakesData.rows.length === 0;
  const preloader = (loading || isItemsEmpty)
    ? <Preloader preload={isItemsEmpty} />
    : null;

  if (error) {
    throw error;
  }

  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>

      <div className={styles.cakeWrapper}>
        {elements}
      </div>
      <div className={styles.preloaderWrapper}>
        {preloader}
      </div>
    </>
  );
};

export default HomePage;
