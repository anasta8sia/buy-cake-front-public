import { FC } from 'react';
import styles from '../../styles/closeBtn.module.scss';

export interface closeBtnPropsInterface {
  onSetFormActive: (isActive: boolean) => void;
}

const CloseBtn: FC<closeBtnPropsInterface > = ({ onSetFormActive }) => (
  <div className={styles.closeBtn}>
    <svg
      onClick={() => onSetFormActive(false)}
      xmlns="http://www.w3.org/2000/svg"
      height="25"
      viewBox="0 96 960 960"
      width="25">
      <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/>
    </svg>
  </div>
);

export default CloseBtn;
