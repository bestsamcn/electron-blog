/**
 * 文章列表
 */
import React from 'react';
import { connect } from 'dva';
import ArticleList from '@/components/article/articlelist';
import { Footer } from '@/components/layouts';
import $$ from '@/utils';
import style from './style.less';
import { withRouter } from 'umi';

@(withRouter as any)
@connect(({article, global}:any)=>({...article, global}))
export default class Article extends React.Component<any>{
	getList(isRefresh=false){
        this.props.dispatch({type:'article/getArticleList', params:{isRefresh}});
    }
    refreshList(){
        this.setState({pageIndex:1, isMore:true}, ()=>this.getList(true));
    }
    getFromHome(){
        if(this.props.global.articleParams.isFromHome && (this.props.global.articleParams.tag || this.props.global.articleParams.category)){
            let _tag = this.props.global.articleParams.tag;
            let _category = this.props.global.articleParams.category;
            let _isMore = true;
            let _pageIndex = 1;
            this.setState({tag:_tag, category:_category, isMore:true, pageIndex:_pageIndex}, ()=>{
                this.props.dispatch({type:'global/setState', payload:{articleParams:{isFromHome:false, tag:'', category:''}}});
                this.getList(true);
            });
        }
    }
	render(){
		const { articleList, isMore } = this.props;
		return(
			<div className={style["article"]}>
		        <div className={style["main"]}>
		            <ArticleList onLoadMore={this.getList.bind(this, false)} articleList={articleList} isMore={isMore} />
		        </div>
		        <Footer/>
		    </div>
		)
	}
	componentWillMount(){
		if(this.props.global.articleParams.isFromHome && (this.props.global.articleParams.tag || this.props.global.articleParams.category)){
            let _tag = this.props.global.articleParams.tag;
            let _category = this.props.global.articleParams.category;
            let _isMore = true;
            let _pageIndex = 1;
            this.props.dispatch({type:'article/setParams', params:{tag:_tag, category:_category, isMore:true, pageIndex:_pageIndex, callback:()=>{
                this.props.dispatch({type:'global/setState', payload:{articleParams:{isFromHome:false, tag:'', category:''}}});
                this.getList(true);
            }}});
        }
	}
	componentWillReceiveProps(){
		// this.getFromHome();
	}
}

