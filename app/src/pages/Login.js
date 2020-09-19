import React from 'react';
import Page from '../components/layouts/Page';
import LoginForm from './../components/forms/LoginForm';
import styles from './Login.module.css';
import { ReactComponent as Logo } from '../assets/logo.svg';
import Icon from './../components/common/Icon';

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
            <LoginForm className={styles.formContainer} />
          </div>
        </div>
      </div>
    </Page>
  );
}
