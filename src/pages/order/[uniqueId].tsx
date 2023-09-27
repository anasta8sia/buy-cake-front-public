import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { OrderInterface, dataService } from '../../service/dataService';
import Preloader from '../../components/Preloader';
import Nbsp from '../../components/Nbsp';
import styles from '../../../styles/uniqueId.module.scss';

const UniqueIdPage: FC = () => {
  const { query: { uniqueId } } = useRouter();

  const [data, setData] = useState<OrderInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!(typeof uniqueId === 'string')) {
        return;
      }

      const response = await dataService.getOrder(uniqueId);
      console.warn('res', response);
      setData(() => response);
    };

    fetchData()
      .finally(() => {
        setLoading(false);
      });
  }, [uniqueId]);

  if (loading) {
    return <Preloader preload={true}/>;
  }

  if (!data) {
    return (
      <p className={styles.errorOrder}>Заказа с данным номером не существует :(</p>);
  }

  return (
    <div>
      <Head>
        <title>Ваш заказ</title>
      </Head>
      <p className={styles.order}>
        <span className={styles.userData}>{data.name}
        </span>, благодарим! Ваша заявка принята.
        <br/>
        Номер вашего заказа:
        <span className={styles.userData}>
          <Nbsp/>
          {uniqueId}
        </span>
      </p>
    </div>
  );
};

export default UniqueIdPage;
