import classNames from 'classnames';
import { ErrorMessage } from 'formik';
import React from 'react';
import { ReactComponent as Close } from '../../assets/close.svg';
import styles from './FormLayout.module.css';

export default function FormLayout({ className, children }) {
  return <div className={classNames(styles.form, className)}>{children}</div>;
}

export const FormRow = ({ children, block }) => (
  <div className={classNames(styles.row, { [styles.block]: block })}>{children}</div>
);

export const FormRowButton = ({ children, block }) => (
  <div className={classNames(styles.buttons, { [styles.block]: block })}>{children}</div>
);

export const FormInputError = ({ name, component }) => (
  <div className={styles.fieldError}>
    <ErrorMessage name={name} component={component}></ErrorMessage>
  </div>
);

export const FormMessage = ({
  children,
  block,
  onDismiss,
  variant = 'error',
  disableDismiss,
}) => (
  <div
    className={classNames(styles.formMessage, styles.row, {
      [styles.block]: block,
      [styles.error]: variant === 'error',
      [styles.success]: variant === 'success',
    })}
  >
    <div className={styles.messageColumn}>{children}</div>
    <div className={styles.dismissColumn}>
      {!disableDismiss && (
        <button type="button" className={styles.dismissButton} onClick={() => onDismiss()}>
          <Close />
        </button>
      )}
    </div>
  </div>
);
