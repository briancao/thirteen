import React from 'react';
import Icon from './../common/Icon';
import LoginForm from '../forms/LoginForm';
import Page from '../layouts/Page';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './Login.module.css';

export default function () {
  return (
    <Page>
      <div className={styles.container}>
        <div className="row">
          <div className="col">
            <div className={styles.formContainer}>
              <h1 className={styles.header}>
                thirteen <Icon icon={<Logo />} size="medium" />
              </h1>
            </div>
            <LoginForm className={styles.formContainer} />
          </div>
        </div>
      </div>
    </Page>
  );
}
