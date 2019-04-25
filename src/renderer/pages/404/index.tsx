/**
 * title:404
 * routerName:404
 */
import React from 'react';
import { Link } from 'umi';
import './style.less';

export default ()=>(
	<div className="middle-box text-center animated fadeInDown">
		<h1>404</h1>
		<h3 className="font-bold">页面未找到！</h3>
		<div className="error-desc">抱歉，页面好像去火星了~</div>
		<div className="get-back-btn">
			<Link to="/">返回首页</Link>
		</div>
	</div>
)