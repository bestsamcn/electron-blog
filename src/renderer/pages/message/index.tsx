/**
 * title: 留言
 * routerName: message
 */
import React from 'react';
import { connect } from 'dva';
import $$ from '@/utils';
import xss from 'xss';
import style from './style.less';

@connect()
export default class Message extends  React.Component<{dispatch:Function}, any>{
    postMessage(e){
        e.preventDefault();
        let form:any = this.refs.form;
        if(!form.name.value){
            return this.props.dispatch({type:'global/setToast', params:{msg:'昵称不能为空'}});
        }
        if(!form.email.value){
            return this.props.dispatch({type:'global/setToast', params:{msg:'邮箱不能为空'}});
        }
        if(!form.content.value){
            return this.props.dispatch({type:'global/setToast', params:{msg:'留言不能为空'}});
        }
        form.content.value = xss(form.content.value);
        let obj = {
            name:form.name.value,
            email:form.email.value,
            content:form.content.value
        }
        this.props.dispatch({type:'message/postMessage', params:{...obj, callback(){
            form.name.value = '';
            form.email.value = '';
            form.content.value = '';
        }}}) 
            
    }
    render(){
        return(
            <div className={style["message"]}>
                <h2 className={style["color-black"]}>CONTACT</h2>
                <form className={style["msg-form"]} ref="form">
                    <h4 className="color-black">Name</h4>
                    <input type="text" name="name"></input>
                    <h4 className="color-black">Email</h4>
                    <input type="text" name="email"></input>
                    <h4 className="color-black">Message</h4>
                    <textarea type="textarea" name="content"></textarea>
                    <button className="button con-share-alt" type="info" onClick={this.postMessage.bind(this)}>发送</button>
                </form>
            </div>
        )
    }
}

