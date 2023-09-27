import { FC, useEffect, useState } from 'react';
import { SHOW_SCROLL_UP_BTN_AFTER } from '../constants';

const ScrollUpBtn: FC = () => {
  const [classes, setClasses] = useState(['scrollUpBtn', 'hiddenScrollUpBtn ']);

  const scrollUp = () => {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  const onScroll = () => {
    const scrollY: any = document.documentElement.scrollTop || window.scrollY;
    const isScrolledEnoughToShow = scrollY > SHOW_SCROLL_UP_BTN_AFTER;
    setClasses(isScrolledEnoughToShow ? ['scrollUpBtn'] : ['scrollUpBtn', 'hiddenScrollUpBtn']);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <svg
      className={classes.join(' ')} onClick={scrollUp}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 96 960 960"
      width="48">
      <path d="M450 896V370L202 618l-42-42 320-320 320 320-42 42-248-248v526h-60Z" />
    </svg>
  );
};

export default ScrollUpBtn;
