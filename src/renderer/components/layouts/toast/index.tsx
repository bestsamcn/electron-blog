import React from 'react';
import '../../assets/css/common/toast.css';

const Toast = ({msg}:{msg:string})=>(
    <div className="animated toast">
        { msg }
    </div>
)
export default Toast;
