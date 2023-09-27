/* eslint-disable max-len */
export const PAGE_SIZE = 6;

export const SHOW_SCROLL_UP_BTN_AFTER = 1000;

export const LOAD_DELAY = 750;

export const VALIDATE_REGEX = {
  NAME: /^([A-Za-z\-']{2,255})|([А-Яа-я\-']{2,255})$/,
  EMAIL: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  MESSAGE: /^[a-zA-Z0-9 !?:;,.()@$%\-+=*'"а-яА-Я\n]{4,255}$/,
};
