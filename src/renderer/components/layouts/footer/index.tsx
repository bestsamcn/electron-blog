import React from 'react';
import { Link } from 'umi';
import styles from './style.less';

class Footer extends React.Component{
    render(){
        return (
            <div className={`${styles.footer} margin-top-20`}>
                <div className={styles.webmap}>
                    <Link to="#/">首页</Link>
                    <Link to="">搜索</Link>
                    <Link to="">关于</Link>
                    <Link to="">留言</Link>
                </div>
                <div className={styles.copyright}>
                    copyright@2017 bestsamcn
                </div>
            </div>
        )
    }
}
export default Footer;
