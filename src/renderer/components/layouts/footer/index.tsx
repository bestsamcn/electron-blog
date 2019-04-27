import React from 'react';
import { Link } from 'umi';
import styles from './style.less';
import { connect } from 'dva';


@connect(({global}:any)=>({...global}))
class Footer extends React.Component<{className?:string, isUpdateAvailable:boolean}, any>{
    render(){
    	const { isUpdateAvailable } = this.props;
        return (
            <div className={ !isUpdateAvailable ? `${styles.footer} margin-top-20` : `${styles.footer} margin-top-20 ${styles['margin-bottom']}`}>
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
