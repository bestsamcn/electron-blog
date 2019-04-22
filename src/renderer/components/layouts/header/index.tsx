import React from 'react';
import { NavLink } from 'umi';
import { connect } from 'dva';
import style from './style.less';
interface IProps{
	isLogin:boolean,
	dipatch:Function,
	iShowMenu:boolean
}

@connect(({global}:any)=>({...global}))
class Header extends React.Component<any> {
    setToggleMenu(){
        this.props.dispatch({type:'global/setToggleMenu', params:{}});
    }

    isActive(match:any, location:any){
    	if(!match) return false;
    	return match.url == location.pathname;
    }
    render(){
        let { isLogin, iShowMenu } = this.props;
        return (
            <div className={style.header}>
                <NavLink to="/" isActive={this.isActive.bind(this)} activeClassName={style.active} className={`${style.logo} color-green`} >B<span className="color-black font-20">est</span></NavLink>
                <div className={`${style['nav-list']} sm-hide`}>
                    <NavLink isActive={this.isActive.bind(this)} to="/" exact activeClassName={style.active}>首页</NavLink>
                    <NavLink isActive={this.isActive.bind(this)} to="/search" exact activeClassName={style.active}>搜索</NavLink>
                    <NavLink isActive={this.isActive.bind(this)} to="/about" exact activeClassName={style.active}>关于</NavLink>
                    <NavLink isActive={this.isActive.bind(this)} to="/message" exact activeClassName={style.active}>留言</NavLink>
                    <NavLink isActive={this.isActive.bind(this)} to={isLogin ? '/admin/home' : '/admin/signin'} exact activeClassName={style.active}>{isLogin ? '管理' : '登录'}</NavLink>
                </div>
                <div className={`${style['menu-btn']} md-hide`}>
                    <a href="javascript:;" onClick={this.setToggleMenu.bind(this)}  className={iShowMenu ? `icon-reorder ${style.on}` : 'icon-reorder' }></a>
                </div>
            </div>
        )
    }
}

export default Header;






