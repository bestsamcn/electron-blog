import React from 'react';
import { connect } from 'dva';
import $$ from '@/utils';
import Helper from '@/utils/filter';
// import Footerbar from '../../components/common/Footer';
import Comment from '@/components/article/comment';
import '@/assets/style/dark.less';
import '@/assets/style/markdown.less';
import style from './style.less';
import { router, Link, withRouter } from 'umi';
import { Footer } from '@/components/layouts';

@(withRouter as any)
@connect(({articleDetail}:any)=>({...articleDetail}))
export default class Detail extends React.Component<any>{
	goBack(){
        router.go(-1)
    }

    likeClick(){
    	let { article } = this.props;
        if($$.getCookie(article._id)){
            this.props.dispatch({type:'global/setToast', params:{msg:'已经点赞过啦'}});
            return;
        }
       	this.props.dispatch({type:'articleDetail/likeArticle', params:{id:article._id}});
    }
	render(){
		const { article, isLiked, prevID, nextID, match } = this.props;
		return (
			<div className={style["article-detail"]}>
		        <div className={style["main"]}>
		            <div className={style["title"]}>
		                <h4 className="color-black">{ article.title }</h4>
		                <div className={`${style.info} margin-top-10`}>
		                    <span className="icon-calendar">{Helper.dateFormat(article.createTime, 'yyyy-MM-dd')}</span>
		                    <span className="icon-map-marker">{article.category && article.category.name}</span>
		                    <span className="icon-eye-open">{Helper.transNum(article.readNum)} Views</span>
		                    <span className="icon-tag">{article.tag && article.tag.name}</span>
		                    {
		                    	!!article.lastEditTime && !this.props.isMobile && <span className="icon-edit">{Helper.dateFormat(article.lastEditTime, 'yyyy-MM-dd hh:mm:ss')}</span>
		                    }
		                    <a href="javascript:;" onClick={this.likeClick.bind(this)} className={isLiked ? `icon-heart ${style.active}` : 'icon-heart'}>{Helper.transNum(article.likeNum) }</a>
		                </div>
		            </div>
		            <p className={style["preview"]}>
		                {article.previewText}
		            </p>
		            <div className={`${style.content} markdown-body`} dangerouslySetInnerHTML={{__html:article.content}}>
		            </div>
		            <div className={style["others"]}>
		                <a href="javascript:;" onClick={this.goBack}>返回</a>
		                {prevID && <Link to={`/article/detail/${prevID}`}>前篇</Link>}
		                {nextID && <Link to={`/article/detail/${nextID}`}>后篇</Link>}
		                <a href="javascript:;" onClick={this.likeClick.bind(this)} className={isLiked && style['is-liked'] || ''}>点赞</a>
		            </div>
		            <Comment className="margin-top-30" article={match.params.id} />
		        </div>
		        <Footer/>
		    </div>
	    )
	}
}

