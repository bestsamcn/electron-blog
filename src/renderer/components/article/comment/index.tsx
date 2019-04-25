import React from 'react';
import { FACE_URL, PAGE_SIZE } from '@/config';
import { connect } from 'dva';
import * as API from '@/services';
import Helper from '@/utils/filter';
import Emoji from '@/components/article/Emoji';
import $$ from '@/utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import style from './style.less';
import { withRouter } from 'umi';
import { ResponseBody } from '@/utils/request';


interface IState {
	name:string,
    email:string,
    content:string,
    parentComment:string,
    isSaveInfo:boolean,
    pageIndex:number,
    pageSize:number,
    commentList:any[],
    reply:null | IReply,
    isMore:boolean,
    replyOffsetWidth:number,
    backSpaceTimes:number,
    shouldShowFace:boolean,
    textFocusStart:number,
    textFocusEnd:number,
    preText:string,
    nexText:string,
    isPressingCtrl:boolean
}

interface IProps{
	className?:string,
	article:string,
	dispatch?:Function
}

interface IReply {
	_id?:string,
	createLog?:{
		createName:string
	}
}

@(withRouter as any)
@connect(({article}:any)=>({...article}))
export default class Comment extends React.Component<IProps, IState>{
	readonly state = {
		name:'',
        email:'',
        content:'',
        parentComment:'',
        isSaveInfo:false,
        pageIndex:1,
        pageSize:PAGE_SIZE,
        commentList:[],
        reply:null,
        isMore:true,
        replyOffsetWidth:0,
        backSpaceTimes:0,
        shouldShowFace:false,
        textFocusStart:0,
        textFocusEnd:0,
        preText:'',
        nexText:'',
        isPressingCtrl:false
	}
	async postClick(){
	    if(!this.state.name){
	        this.props.dispatch!({type:'global/setToast', params:{msg:'请先填写用户名'}});
	        return;
	    }
	    if(!this.state.email){
	        this.props.dispatch!({type:'global/setToast', params:{msg:'请先填写邮箱'}});
	        return;
	    }
	    if(!this.state.content.replace(/^\s+|\s+$/,'')){
	        this.props.dispatch!({type:'global/setToast', params:{msg:'填写内容'}});
	        this.setState({content:''});
	        return;
	    }
	    var reg = /(<|\$lt)fa(>|\$gt)([\d]*)(\1\/fa\2)/gi;
	    var __content = this.state.content.replace(reg, ($1, $2, $3, $4)=>{ return $1 = '<img src="'+FACE_URL+'/'+$4+'.png">' })
	    var obj = {
	        article:this.props.article,
	        name:this.state.name,
	        email:this.state.email,
	        content:__content,
	        parentComment:this.state.parentComment
	    }
	    if(!!this.state.reply){
	        obj.parentComment = (this.state.reply as any)!._id;
	    }
	    try{
	    	let res = await API.addComment(obj)
	        this.state.isSaveInfo && this.saveInfo(this);
	        let _commentList = (this.state.commentList as any);

	        //tslint:disable-next-line
	        _commentList.unshift(res.data);
	        this.setState({
	        	content:'',
	        	parentComment:'',
	        	reply:null,
	        	commentList:_commentList,
	        	replyOffsetWidth:0
	        });
	    }catch(e){}
	    
	}
	refreshList(){
	    // if(this.$route.name !== 'ArticleDetail') return;
	    this.setState({pageIndex:1, isMore:true});
	    this.getList(true);
	}
	saveInfo(_this:any){
	    if(!_this.state.name){
	        _this.props.dispatch({type:'global/setToast', params:{msg:'请先填写用户名'}});
	        return;
	    }
	    if(!_this.state.email){
	        _this.props.dispatch({type:'global/setToast', params:{msg:'请先填写邮箱'}});
	        return;
	    }
	    window.localStorage['__postName__'] = _this.state.name;
	    window.localStorage['__email__'] = _this.state.email;
	    window.localStorage['__isSaveInfo__'] = true;
	    _this.setState({isSaveInfo:true});
	}
	getList(isRefresh:boolean){
	    if(!this.state.isMore) return;
	    var obj = {
	        pageIndex:this.state.pageIndex,
	        pageSize:this.state.pageSize,
	        id:this.props.article
	    }
	    API.getCommentList(obj).then((res:ResponseBody)=>{
	    	let _commentList = this.state.commentList.concat(res.data);
	        isRefresh ? this.setState({commentList:res.data}) : this.setState({commentList: _commentList});
	        if(this.state.pageIndex * this.state.pageSize >= res.total!){
	            this.setState({isMore:false});
	            return;
	        }
	        let _pageIndex = this.state.pageIndex + 1;
	        this.setState({pageIndex:_pageIndex, isMore:true});
	    });
	}
	likeClick(isLike:boolean, item:any){
	    if(!!$$.getCookie(item._id+'__setLikeComment__')){
	        return this.props.dispatch!({type:'global/setToast', params:{msg:'你已投票，明天再来吧'}});
	    };
	    var obj = {
	        id:item._id,
	        isLike:isLike
	    }
	    let index = (this.state.commentList as any).indexOf(item);
	    let _commentList = (this.state.commentList as any);
	    API.setCommentLike(obj).then(res=>{
	        !isLike && (item.likeNum --);
	        !!isLike && (item.likeNum ++);
	        _commentList.splice(index, 1, item);
	        this.setState({commentList:_commentList});
	        $$.setCookie(item._id+'__setLikeComment__', true, 1);
	    });
	}
	replyClick(item:any){
	    // this.content = '@'+item.createLog.createName+': ';
	    this.setState({reply:item});
	    setTimeout(()=>{
	        var replyName = document.getElementById(style["reply-name"]);
	        var messageContent = document.getElementById('message-content');
	        this.setState({replyOffsetWidth:replyName!.offsetWidth-10});
	        messageContent && messageContent.blur();
	        messageContent && messageContent.focus();
	    });
	}
	backSpace(e:any){
	    if(this.state.content.replace(/^\s+|\s+$/,'').length == 0){

	    	//this.state.backSpaceTimes++不行
	    	let _backSpaceTimes = this.state.backSpaceTimes+1;
	        this.setState({backSpaceTimes:_backSpaceTimes});
	    }else{
	        this.setState({backSpaceTimes:0});
	    }
	    if(this.state.backSpaceTimes >=3){
	        this.setState({
	        	reply:null,
	        	backSpaceTimes:0,
	        	replyOffsetWidth:0
	        });
	    }
	}
	getTextFocus(e:any){
	    var el = e.target;
	    let _textFocusStart = el.selectionStart;
	    let _textFocusEnd = el.selectionEnd;
	    let _preText = this.state.content.substring(0, this.state.textFocusStart);
	    let _nexText = this.state.content.substring(this.state.textFocusEnd);
	    this.setState({
	    	textFocusStart:_textFocusStart,
	    	textFocusEnd:_textFocusEnd,
	    	preText:_preText,
	    	nexText:_nexText
	    });
	    e.keyCode === 8 && this.backSpace(e);
	}
	showFace(){
	    let _shouldShowFace = !this.state.shouldShowFace;
	    this.setState({shouldShowFace:_shouldShowFace});
	}
	onFaceClick(item:any){
	    var faceText = `<fa>${item}</fa>`;
	    let _content = this.state.preText+faceText+this.state.nexText;
	    let _preText = this.state.preText+faceText;
	    this.setState({content:_content, preText:_preText});
	    if(this.state.isPressingCtrl) return;
	    this.setState({shouldShowFace:false});
	}
	handleCtrl(flag:any){
	    //vue2 keyup.ctrl没有触发，蛋疼多选表情砍了吧。
	    this.setState({isPressingCtrl:flag});
	}
	filterHtml(str:any){
	    return str.replace(/<(?!img)[^>]*>/,"");
	}
	componentWillMount(){
        this.setState({
        	name: window.localStorage['__postName__'] || '',
        	email:  window.localStorage['__email__'] || '',
        	isSaveInfo: window.localStorage['__isSaveInfo__'] || false
        })
        this.refreshList();
	}
	setValue(e:any){
		interface IObj{
			[propertyName:string]:any
		}
		let obj:IObj = {};
		obj[e.target.name] = e.target.value;
		if(e.target.type === 'checkbox' || e.target.type === 'radio') {
			obj[e.target.name] = e.target.checked;
		}
		this.setState(obj as any);// tslint:disable-line 
	}
	render(){
		return(
			<div className={style["comment"]}>
		        <div className={style["comment-form"]}>
		            <ul>
		                <li>
		                    <input type="text" name="name" value={this.state.name} onChange={this.setValue.bind(this)} placeholder="你的昵称" />
		                </li>
		                <li>
		                    <input type="text" name="email" onChange={this.setValue.bind(this)}  value={this.state.email} placeholder="请填写有效邮箱，否则无法收到回复通知" />
		                </li>
		                <li style={{position:'relative'}}>
		                    {this.state.reply && <span id={style["reply-name"]}>@{(this.state.reply as any).createLog.createName}: </span>}
		                    <textarea onChange={this.setValue.bind(this)} value={this.state.content} onMouseUp={this.getTextFocus.bind(this)} onMouseDown={this.getTextFocus.bind(this)} onKeyUp={this.getTextFocus.bind(this)} onKeyDown={this.getTextFocus.bind(this)} onFocus={this.getTextFocus.bind(this)} onBlur={this.getTextFocus.bind(this)} placeholder={this.state.replyOffsetWidth ? '' : '回复内容'} id="message-content" style={{textIndent:this.state.replyOffsetWidth+'px'}}  name="content" cols="30" rows="10">
		                    </textarea>
		                </li>
		                <li className={style["others-bar"]}>
		                    <label>
		                        <input type="checkbox" onChange={this.setValue.bind(this)} checked={!!this.state.isSaveInfo} name="isSaveInfo" />
		                        <span className="icon-check-empty">记住评论信息</span>
		                    </label>
		                    <a href="javascript:;" className={`${style['face']} icon-github-alt`} onClick={this.showFace.bind(this)}>表情</a>
		                    <button onClick={this.postClick.bind(this)} className="sub-btn">提交</button>
		                    <ReactCSSTransitionGroup
		                    	transitionEnter={true}
		                        transitionLeave={true}
		                        transitionEnterTimeout={300}
		                        transitionLeaveTimeout={200}
		                        transitionName="fadeInLeft"
		                    >
		                    {this.state.shouldShowFace && <Emoji onFaceClick={this.onFaceClick.bind(this)} />}
		                    </ReactCSSTransitionGroup>
		                </li>
		            </ul>
		        </div>

		        <div className={style["comment-list"]}>
		        	{
			        	this.state.commentList.map((item, index)=>(
				            <div className={style["comment-item"]} key={(item as any)._id && index}>
				                <div className={style["favor"]}>
				                    <a href="javascript:;" onClick={()=>this.likeClick(true, item)} className="icon-sort-up up"></a>
				                    <span>{(item as any).likeNum}</span>
				                    <a href="javascript:;" onClick={()=>this.likeClick(false, item)} className="icon-sort-down down"></a>
				                </div>
				                <div className={style["cont"]}>
				                    <h4 className={`${style["title"]} text-left`}>
				                        {(item as any).createLog.createName}：
				                    </h4>

				                    {!!(item as any).parentComment && <p className="quote">@{(item as any).parentComment.createLog.createName}：<span dangerouslySetInnerHTML={{__html:this.filterHtml((item as any).parentComment.content)}}></span></p>}
				                    <p className="text text-left color-black margin-top-5 curr-text" dangerouslySetInnerHTML={{__html:this.filterHtml((item as any).content)}}>
				                    </p>
				                    <div className={`${style.operate} text-left margin-top-10`}>
				                        <a className="color-gray font-12 icon-time">{Helper.dateDesc((item as any).createLog.createTime)}</a>
				                        <a href="javascript:;" className="text-left margin-left-10 color-gray font-12 icon-comment" onClick={()=>this.replyClick(item)}>回复</a>
				                    </div>
				                </div>
				            </div>
			            ))
		           	}
		        </div>
		        {!this.state.isMore && <p className="text-center margin-top-10 color-gray">没有更多了...</p>}
		        {this.state.isMore && <a href="javascript:;" onClick={this.getList.bind(this, false)} className="more-btn md-hide">More</a>}
		    </div>
		)
	}
}
