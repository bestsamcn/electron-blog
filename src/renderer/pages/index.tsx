import React from 'react';
import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import { remote } from 'electron';

export default function() {
  const a:string = 's';
  const { window } = remote.getGlobal('services');
  console.log(window, 'sdf')
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, {a} {window.test && window.test()} <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {formatMessage({ id: 'index.start' })}
          </a>
        </li>
      </ul>
    </div>
  );
}
