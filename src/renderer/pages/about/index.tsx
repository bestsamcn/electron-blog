import React from 'react';
import Clock from '@/components/about/Clock';
import style from './style.less';


class About extends React.Component{
    render(){
        return(
            <div className={style["about"]} >
                <div className={style["main"]}>
                    <div className={style["info-box"]}>
                        <div className={style["bg"]}>
                            <Clock />
                        </div>
                        <div className={style["avatar"]}>
                            <img src={require('../../assets/img/avatar.png')} />
                        </div>
                        <div className={style["describe"]}>
                            <div className={`${style.name} color-black font-20`}>
                                BestSamCN
                            </div>
                            <div className={`${style.intr} color-gray font-14 margin-top-5`}>
                                一条有梦想的咸鱼
                            </div>
                        </div>
                        <div className={style["footer"]}>
                            <a href="https://github.com/bestsamcn" className="icon-github"></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;