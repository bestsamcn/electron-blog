/**
 * title: 首页
 */
import { remote } from 'electron';
import React from 'react';
import { Footer } from '@/components/layouts';
import ArticleList from '@/components/article/articlelist';
import $$ from '../utils';
import { connect } from 'dva';
import { router } from 'umi';

@connect(({home}:any)=>({...home}))
export default class Home extends React.Component<any> {
	scrollBarRef:any;
    readonly state = {
        articleList:[],
        pageIndex:1,
        pageSize:5,
        isMore:true,
        categoryArticleGroup:[],
        tagArticleGroup:[]
    }
    scrollBar(){
        if(this.props.isMobile) return;
        var _body:any = document.body;
        var el:any = this.scrollBarRef;
        var _pNode = el!.parentNode;

        // return
        el.slideBar = ()=>{
            //滚动的极限距离
            var h:any = parseInt(_pNode.offsetHeight) - parseInt(el.offsetHeight)-20;
            var mainOffsetTop = parseInt(_pNode.offseTop);
            var mainHeight = parseInt(_pNode.offsetHeight);
            var slideBarHeight =  parseInt(el.offsetHeight) - 40 ;
            var slideBarIntOffsetTop = 20;
            var slideFunc = function() {
                var scrollTop = parseInt(_body.scrollTop);
                var slideBarOffsetTop = parseInt(el.offsetTop);
                var slideBarTop  = parseInt(el.style.top) || 0;

                //如果侧边栏和主体只差小于侧边栏的原始offsetTop就不滚动
                if(parseInt(h) < slideBarIntOffsetTop){
                    return false;
                }
                // var aniDistant=Math.min( ( Math.max( ( -mainOffsetTop, ( scrollTop - slideBarOffsetTop + slideBarTop)))), (mainHeight - slideBarHeight ) );
                var aniDistant= Math.min(  scrollTop , (mainHeight - slideBarHeight ) );
                //
                if (aniDistant > h) {
                    aniDistant = h
                };
                if (parseInt(_body.scrollTop) > slideBarIntOffsetTop ) {
                    $$.moveStart(el, {'top':aniDistant});
                } else {
                    $$.moveStart(el, {'top':10});
                }
            }
            window.addEventListener('scroll', slideFunc);
            document.addEventListener('resize', slideFunc);
        }
        setTimeout(()=>{
            el.slideBar()
        }, 500)
    }

    componentDidMount(){
        this.scrollBar();
    }
    goArticleClick(name:string, type:string){
    	interface Temp {
    		[propName:string]:any
    	}
        const obj:Temp = {
            category:'',
            tag:'',
            isFromHome:true
        }
        obj[type] = name;
        // this.props.setArticleParams(obj)
        setTimeout(()=>{
            router.push('/article');
        })
    }

    getArticleList(){
    	let { isMore } = this.props;
    	if(!isMore) return;
    	this.props.dispatch({type:'home/getArticleList', params:{isRefresh:false}});
        this.scrollBar();
    }
    render(){
    	let { isMore, isMobile, articleList } = this.props;
        return (
            <div className="home">
                <div className="main">
                    <div className="wrapper">
                        <div className="left-cont">
                            <ArticleList onLoadMore={this.getArticleList.bind(this, false)} isShowMore={true} isMobile={isMobile} isMore={isMore} articleList={articleList} />
                        </div>
                        {!this.props.isMobile && <div className="right-bar sm-hide" ref={ref=>this.scrollBarRef=ref}>
                            
                        </div>}
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

