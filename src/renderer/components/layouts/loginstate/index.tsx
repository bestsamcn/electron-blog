import React from 'react';

interface IProps{
	setLogin:Function,
	isLogin:boolean
}

const LoginState = ({setLogin, isLogin}:IProps)=>(
    <a href="javascript:;" onClick={()=>setLogin(!isLogin)}>{isLogin ? '管理' : '登录'}</a>
)

export default LoginState;
