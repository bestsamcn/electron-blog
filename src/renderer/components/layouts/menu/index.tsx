import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'umi';
import router from 'umi/router';
import styles from './style.less';

interface IProps{
	isLogin?:boolean,
	dispatch?:Function,
	location:any
}

@(withRouter as any)
@connect(({global}:any)=>({...global}))
export default class Menu extends React.Component<IProps, any>{
	goAndHideMenu(routerName:string){
        router.push(routerName);
        this.props.dispatch!({type:'global/setState', payload:{iShowMenu:false}});
    }
	render(){
        var _route = this.props.isLogin ? '/admin/home' : '/admin/signin';
		return(
			<div className={`animated ${styles.menu}`}>
		        <a className={this.props.location.pathname == '/' ? `icon-bold ${styles.active}` : 'icon-bold'} onClick={this.goAndHideMenu.bind(this, '/')} >首页</a>
		        <a className={this.props.location.pathname == '/search' ? `icon-bold ${styles.active}` : 'icon-search'} onClick={this.goAndHideMenu.bind(this, '/search')}>搜索</a>
		        <a className={this.props.location.pathname == '/about' ? `icon-bold ${styles.active}` : 'icon-leaf'} onClick={this.goAndHideMenu.bind(this, '/about')}>关于</a>
		        <a className={this.props.location.pathname == '/message' ? `icon-bold ${styles.active}` : 'icon-comment'} onClick={this.goAndHideMenu.bind(this, '/message')}>留言</a>
		        <a className='icon-user' onClick={this.goAndHideMenu.bind(this,_route)}>{this.props.isLogin ? '管理' :'登录'}</a>
		    </div>
		)
	}
}
