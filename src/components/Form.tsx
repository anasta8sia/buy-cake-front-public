import {
  FieldError,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import OutsideClickHandler from 'react-outside-click-handler';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { VALIDATE_REGEX } from '../constants';
import CloseBtn from '../components/CloseBtn';
import DimmedOutsideWrapper from './DimmedOutsideWrapper';
import { dataService } from '../service/dataService';

import styles from '../../styles/form.module.scss';

export interface FormFieldInterface {
  name: string;
  email: string;
  msg: string;
}

export interface formActivePropsInterface {
  formActive: boolean;
  onSetFormActive: (isActive: boolean) => void;
}

type FieldNameType = 'name' | 'email' | 'msg';

const handlerInput = (entity: UseFormRegister<FormFieldInterface>, fieldName: FieldNameType, regExp: RegExp) => ({
  ...entity(fieldName, {
    required: 'Поле обязательно к заполнению',
    pattern: {
      value: regExp,
      message: 'Поле заполнено некорректно',
    },
  }),
});

const getErrorBlock = (type: FieldNameType, entity?: FieldError) => {
  const clazz = type === 'msg' ? styles.errorTextarea : styles.errorInput;
  const inner = entity ? <div>{entity.message}</div> : null;

  return <div className={clazz}>{inner}</div>;
};

const OrderPage: FC<formActivePropsInterface> = ({ formActive, onSetFormActive }) => {
  const router = useRouter();
  const [error, setError] = useState<any>(null);

  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormFieldInterface>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormFieldInterface> = async (data) => {
    try {
      await dataService.createOrder(data)
        .then((order) => {
          router.push(`/order/${order.uniqueId}`);
        });
    } catch (e: unknown) {
      return setError('Неизвестная ошибка сервера');
    }

    reset();
    onSetFormActive(false);
  };

  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (as !== window.location.href) {
        onSetFormActive(false);
      }

      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  if (!formActive) {
    return null;
  }

  return (

    <div>
      <Head>
        <title>Заказать</title>
      </Head>
      <DimmedOutsideWrapper>
        <OutsideClickHandler onOutsideClick={() => onSetFormActive(false)}>
          <form onSubmit={handleSubmit(onSubmit)}
            className={styles.form}>

            <h3>Оформить заявку</h3>

            <CloseBtn onSetFormActive={onSetFormActive}/>

            <p className={styles.wrapper}>
              Укажите ваши данные и комментарий к заказу<br />
              В ближайшее время мы с вами свяжемся
            </p>

            <div className={styles.fields}>
              <input

                {...handlerInput(register, 'name', VALIDATE_REGEX.NAME)}
                className={styles.inputName}
                autoComplete="off"
                id="name"
                placeholder=" " />

              <label
                className={styles.placeholderName}
                htmlFor="name">
                Имя
              </label>
              {getErrorBlock('name', errors.name)}

              <input

                {...handlerInput(register, 'email', VALIDATE_REGEX.EMAIL)}

                className={styles.inputEmail}
                autoComplete="off"
                id="email"
                placeholder=" " />

              <label
                className={styles.placeholderEmail}
                htmlFor="email">
                E-mail
              </label>
              {getErrorBlock('email', errors.email)}

              <textarea

                {...handlerInput(register, 'msg', VALIDATE_REGEX.MESSAGE)}
                className={styles.textareaText}
                autoComplete="off"
                id="text"
                placeholder=" " />
              <div className={styles.quantity}>{(watch().msg || '').length} / 255</div>

              <label
                className={styles.placeholderText}
                htmlFor="text">
                Комментарий
              </label>
              {getErrorBlock('msg', errors.msg)}

              <button
                type='submit'
                disabled={!isValid}>
                Отправить
              </button>
              <div className={styles.formError}>{error}</div>
            </div>

          </form>
        </OutsideClickHandler>
      </DimmedOutsideWrapper>
    </div>

  );
};

export default OrderPage;
