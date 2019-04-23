import React from 'react';
import style from './style.less';

const Toast = ({msg}:{msg:string})=>(
    <div className={`animated ${style.toast}`}>
        { msg }
    </div>
)
export default Toast;
