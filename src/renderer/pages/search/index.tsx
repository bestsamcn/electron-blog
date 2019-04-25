/**
 * title:搜索
 * routerName:search
 */
import React from 'react';
import { Footer } from '@/components/layouts';
import $$ from '@/utils';
import { connect } from 'dva';
import { Link } from 'umi';
import ArticleList from '@/components/article/articlelist';
import style from './style.less';
import Base from '@/components/Base'


@connect(({search, global}:any)=>({...search, global}))
export default class Search extends Base<any>{
	readonly state = {
        isCache:false,
        keyword:''
	}
	getSearchList(isRefresh:boolean){
       this.props.dispatch({type:'search/getSearchList', params:{isRefresh}});
    }
    setKeyword(e:any){
        let value = e.target.value;
        this.setState({keyword:value});
    }
    onKeywordEnter(e:any){
        if(e.keyCode === 13){
            this.props.dispatch({type:'search/onKeywordEnter', params:{keyword:this.state.keyword, isRefresh:true}});
        }
        return false;
    }
    componentWillMount() {
        if(this.props.hotWord && this.props.hotWord.isFromHotWord && this.props.hotWord.name){	
            this.setState({keyword: this.props.hotWord.name}, ()=>{
                if(!this.state.isCache) this.getSearchList(true);
            });
            return;
        }
        this.getSearchList(true);
    }
	render(){
		const { isMore, articleList } = this.props;
		const { isMobile } = this.props.global;
		return(
			<div className={style["search"]}>
		        <div className={style["wrapper"]}>
		            <div className={`moveup ${style['search-bar']} sm-100`}>
		                <form style={{width:'100%'}} noValidate action="javascript:;">
		                    <input type="search" name="search" placeholder="搜索" value={this.state.keyword} onChange={this.setKeyword.bind(this)} onKeyDown={this.onKeywordEnter.bind(this)} className={style["search-input"]} />
		                </form>
		                <i className={`icon-search ${style['search-btn']}`}></i>
		            </div>
		            <div className="margin-top-20">
		                <ArticleList 
		                	onLoadMore={this.getSearchList.bind(this, false)} 
		                	isMobile={isMobile} 
		                	isShowMore={true} 
		                	className="padding-0 border-top-1" 
		                	isMore={isMore} 
		                	articleList={articleList} />
		            </div>
		        </div>
		        <Footer />
		    </div>
		)
	}
}

