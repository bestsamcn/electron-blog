import React from 'react';
import style from './style.less';
import { remote } from 'electron';

export default class Updator extends React.Component<any>{
	readonly state = {

	}

	render(){
		return(
			<div className={style.updator}>
				<span>提醒：</span>服务器有版本可供更新<a>马上升级</a>
			</div>
		)
	}
}