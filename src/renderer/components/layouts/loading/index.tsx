import React from 'react';
import style from './style.less';

const Loading = ({isLoading}:{isLoading:boolean})=>{
    return (
        <div className="loading" style={{display: isLoading ? 'block' : 'none'}}>
            <div className={style.loadMask}></div>
            <div className={style.loadEffect}>
                <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
            </div>
        </div>
    )
}
export default Loading;
