import { useRouter } from 'next/router';
import Link from 'next/link';
import { FC, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import styles from '../../styles/navbar.module.scss';

interface NavigationInterface {
  id: number;
  title: string;
  path: string;
}

interface NavBarPropsInterface {
  handleOpenCloseForm: (isActive: boolean) => void;
}

const navigation: NavigationInterface[] = [
  { id: 1, title: 'Главная', path: '/' },
  { id: 2, title: 'Начинки', path: '/fillings' },
];

const NavBar: FC<NavBarPropsInterface> = ({ handleOpenCloseForm }) => {
  const { pathname } = useRouter();

  const [navEnabled, setNavEnabled] = useState(false);

  const classes = [styles.navbar];

  if (navEnabled) {
    classes.push(styles.activeMenu);
  }

  return (

    <nav>
      <div className={styles.heading}>Вкусные торты</div>

      <div
        className={classes.join(' ')}>

        {navigation.map(({ id, title, path }) => (
          <Link
            onClick={() => setNavEnabled(false)}
            key={id}
            href={path}
            className={pathname === path ? 'active' : null}
          >{title}</Link>
        ))}

        <a href="#"
          className='articlOrder'
          onClick={() => {
            setNavEnabled(false);
            handleOpenCloseForm(true);
          }
          }>Заказать</a>
      </div>

      <div
        className={styles.mobileBtn}
        onClick={() => setNavEnabled(!navEnabled)}>
        {navEnabled
          ? <AiOutlineClose
            size={25}
            color='#666666' />
          : <AiOutlineMenu
            size={25}
            color='#666666' />
        }
      </div>
    </nav>

  );
};

export default NavBar;
