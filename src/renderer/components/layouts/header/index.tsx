import React from 'react';
import { NavLink } from 'umi';
import { connect } from 'dva';
import style from './style.less';
console.log(style, 'ddddddddd')
interface IProps{
	isLogin:boolean,
	dipatch:Function,
	iShowMenu:boolean
}

@connect((state:any)=>({...state}))
class Header extends React.Component<any> {
    render(){
        let { isLogin, iShowMenu } = this.props;
        return (
            <div className={style.header}>
                <NavLink to="/" activeClassName="active" className="logo color-green" >B<span className="color-black font-20">est</span></NavLink>
                <div className={`${style['nav-list']} sm-hide`}>
                    <NavLink to="/" activeClassName="active">首页</NavLink>
                    <NavLink to="/search" activeClassName="active">搜索</NavLink>
                    <NavLink to="/about" activeClassName="active">关于</NavLink>
                    <NavLink to="/message" activeClassName="active">留言</NavLink>
                    <NavLink to={isLogin ? '/admin/home' : '/admin/signin'} activeClassName="active">{isLogin ? '管理' : '登录'}</NavLink>
                </div>
                <div className={`${style['menu-btn']} md-hide`}>
                    <a href="javascript:;"  className={iShowMenu ? 'icon-reorder on' : 'icon-reorder' }></a>
                </div>
            </div>
        )
    }
}

export default Header;






