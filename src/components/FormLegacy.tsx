/* eslint-disable no-unused-expressions */
import Head from 'next/head';
import { ChangeEvent, useEffect, useState } from 'react';
import { VALIDATE_REGEX } from '../constants';
import CloseBtn from '../components/CloseBtn';
import styles from '../../../styles/form.module.scss';

interface UseValidInterface {
  isEmpty: boolean;
  nameError?: boolean;
  emailError?: boolean;
  msgError?: boolean;
}

const getErrorBlock = (entity: UseValidInterface & { isDirty: boolean }) => {
  let text = '';

  if (entity.isDirty && entity.isEmpty) {
    text = 'Поле не может быть пустым';
  } else if (entity.isDirty && (entity.nameError || entity.emailError || entity.msgError)) {
    text = 'Поле заполнено некорректно';
  }

  const clazz = entity.msgError ? styles.warningTextarea : styles.warningInput;

  return text
    ? <div className={clazz}>{text}</div>
    : null;
};

const useValidation = (value: string, validations: UseValidInterface) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [msgError, setMsgError] = useState(false);
  const [inputValid, setinputValid] = useState(false);

  useEffect(() => {
    for (const [validationKey] of Object.entries(validations)) {
      switch (validationKey) {
        case 'isEmpty':
          value
            ? setIsEmpty(false)
            : setIsEmpty(true);
          break;

        case 'nameError':
          return VALIDATE_REGEX.NAME.test(String(value).toLowerCase())
            ? setNameError(false)
            : setNameError(true);

        case 'emailError':

          return VALIDATE_REGEX.EMAIL.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError(true);

        case 'msgError':

          return VALIDATE_REGEX.MESSAGE.test(String(value).toLowerCase())
            ? setMsgError(false)
            : setMsgError(true);
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || nameError || emailError || msgError === true) {
      setinputValid(false);
    } else {
      setinputValid(true);
    }
  }, [isEmpty, nameError, emailError, msgError]);

  return {
    isEmpty,
    nameError,
    emailError,
    msgError,
    inputValid,
  };
};

const useInput = (initialValue: string, validations: UseValidInterface) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(ev.target.value);
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    ...valid,
    value,
    onChange,
    onBlur,
    isDirty,
  };
};

const OrderPage = ({ onSetFormActive }) => {
  const userName = useInput('', { isEmpty: true, nameError: true });
  const userEmail = useInput('', { isEmpty: true, emailError: true });
  const userMsg = useInput('', { isEmpty: true, msgError: true });

  return (
    <div>
      <Head>
        <title>Заказать</title>
      </Head>
      <div className={styles.wrapper}>

        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <legend>Оформить заявку</legend>

            <CloseBtn onSetFormActive={onSetFormActive}/>

            <p className={styles.wrapper}>
              Укажите ваши данные и комментарий к заказу<br />
              В ближайшее время мы с вами свяжемся
            </p>

            <div className={styles.fields}>
              <input
                value={userName.value}
                onChange={(ev) => userName.onChange(ev)}
                onBlur={() => userName.onBlur()}
                className={styles.inputName}
                type="text"
                name="name"
                autoComplete="off"
                id="name"
                placeholder=" "/>

              <label
                className={styles.placeholderName}
                htmlFor="name">Имя</label>

              {getErrorBlock(userName)}

              <input
                value={userEmail.value}
                onChange={(ev) => userEmail.onChange(ev)}
                onBlur={() => userEmail.onBlur()}
                className={styles.inputEmail}
                type="mail"
                name="email"
                autoComplete="off"
                id="email"
                placeholder=" " />

              <label
                className={styles.placeholderEmail}
                htmlFor="email">E-mail</label>

              {getErrorBlock(userEmail)}

              <textarea
                value={userMsg.value}
                onChange={(ev) => userMsg.onChange(ev)}
                onBlur={() => userMsg.onBlur()}
                className={styles.textareaText}
                name="text"
                autoComplete="off"
                id="text"
                placeholder=" " />
              <div className={styles.quantity}>1/255</div>

              <label
                className={styles.placeholderText}
                htmlFor="text" >Комментарий</label>

              {getErrorBlock(userMsg)}

              <button disabled={!userEmail.inputValid ||
              !userName.inputValid ||
              !userMsg.inputValid} type="submit">Отправить</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
