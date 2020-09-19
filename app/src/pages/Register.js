import React from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import Page from '../components/layouts/Page';
import Icon from './../components/common/Icon';
import RegisterForm from './../components/forms/RegisterForm';
import styles from './Register.module.css';

export default function () {
  return (
    <Page>
      <div className={styles.container}>
        <div className="row">
          <div className="col">
            <div className={styles.formContainer}>
              <h1 className={styles.header}>
                Thirteen <Icon icon={<Logo />} size="medium" />
              </h1>
            </div>
            <RegisterForm className={styles.formContainer} />
          </div>
        </div>
      </div>
    </Page>
  );
}
