import React from 'react';
import { render } from 'react-dom';
import {IndexLink, Link, browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLogin, setToggleMenu } from '../../store/actions';

import '../../assets/css/common/header.css';

interface IProps{
    isLogin:boolean,
    iShowMenu:boolean,
    setToggleMenu:function
}

//非方法
export default class Header extends React.Component<IProps, {}> {
    render(){
        let isLogin = this.props.isLogin || false;
        return (
            <div className="header">
                <IndexLink to="/" activeClassName="active" className="logo color-green" >B<span className="color-black font-20">est</span></IndexLink>
                <div className="nav-list sm-hide">
                    <IndexLink to="/" activeClassName="active">首页</IndexLink>
                    <Link to="/search" activeClassName="active">搜索</Link>
                    <Link to="/about" activeClassName="active">关于</Link>
                    <Link to="/message" activeClassName="active">留言</Link>
                    <Link to={isLogin ? '/admin/home' : '/admin/signin'} activeClassName="active">{isLogin ? '管理' : '登录'}</Link>
                </div>
                <div className="menu-btn md-hide">
                    <a href="javascript:;" onClick={this.props.setToggleMenu} className={this.props.iShowMenu ? 'icon-reorder on' : 'icon-reorder' }></a>
                </div>
            </div>
        )
    }
}