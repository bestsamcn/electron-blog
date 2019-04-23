import React from 'react';
import { SHOW_TOP_DISTANT } from '@/config';
import $$ from '@/utils';
import style from './style.less';

export default class Gotop extends React.Component<any>{
	el:any;

	//切换样式
	backTop(){
		var nScrollTop, nClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		console.log(this.el, 'dddddddd')
		var elClass=this.el!.className;
        this.el!.temp = ()=>{
        	nScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	        if (nScrollTop > SHOW_TOP_DISTANT) {
	        	this.el!.className=`${style['go-top-btn']} ${style['show']}`;
	        } else {
	        	this.el!.className=style['go-top-btn'];
	        }
        }
        this.el!.temp();
        window.addEventListener('scroll',this.el!.temp);
	}

	//点击返回
	goTopClick(){
		setTimeout(()=>{
			$$.toScrollHeight(0, this.el);
		}, 500)
	}

	componentDidMount(){
		this.backTop();
		this.goTopClick();
	}

	render(){
		return(
			<div className={style['back-top']}>
				<a href="javascript:;" ref={ref=>this.el=ref} className={style['go-top-btn']}>
					<span className="icon-arrow-up"></span>
				</a>
			</div>
		)
	}
}
