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
    render(){
        let { isLogin, iShowMenu } = this.props;
        console.log(style, 'iShowMenu')
        return (
            <div className={style.header}>
                <NavLink to="/" activeClassName="active" className={`${style.logo} color-green`} >B<span className="color-black font-20">est</span></NavLink>
                <div className={`${style['nav-list']} sm-hide`}>
                    <NavLink to="/" exact activeClassName="active">首页</NavLink>
                    <NavLink to="/search" activeClassName="active">搜索</NavLink>
                    <NavLink to="/about" activeClassName="active">关于</NavLink>
                    <NavLink to="/message" activeClassName="active">留言</NavLink>
                    <NavLink to={isLogin ? '/admin/home' : '/admin/signin'} activeClassName="active">{isLogin ? '管理' : '登录'}</NavLink>
                </div>
                <div className={`${style['menu-btn']} md-hide`}>
                    <a href="javascript:;" onClick={this.setToggleMenu.bind(this)}  className={iShowMenu ? `icon-reorder on` : 'icon-reorder' }></a>
                </div>
            </div>
        )
    }
}

export default Header;






