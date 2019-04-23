
import React from 'react';
import * as CONFIG from '@/config';
import Helper from '@/utils/filter';
import { router } from 'umi';
import style from './style.less';

interface IProps{
	articleList:any[],
	isMore:boolean,
	isShowMore:boolean,
	isMobile:boolean,
	onLoadMore:(e:any)=>void
}

const ArticleList = ({articleList, isMore, isShowMore=true, isMobile, onLoadMore}:IProps)=>{

    //指令真难搞
    let autoSize = (e:any)=>{
        var img = new Image();
        var nimg = e.target;
        img.src= e.target.src;
        img.onload = (ee:any)=>{
            var w = ee.path[0].width;
            var h = ee.path[0].height;
            if(w > h){
                nimg.style="height:100%;width:initial";
            }else{
                nimg.style="height:initial;width:100%";
            }
        }
    }
    let goUrl = (url:string)=>{
        router.push(url);
    }
    return (
        <div className={style["article-list"]} >
            {
                articleList.map(item=>(
                    <div className={(!!item.poster && !isMobile) ?  `${style.item} has-right` : style.item} onClick={()=>goUrl(`/article/detail/${item._id}`)}  key={item._id}>
                        <div className={style["left"]}>
                            <div className={style["title"]}>
                                <h4 className="color-black">{item.title}</h4>
                                <div className={`${style.info} margin-top-10`}>
                                    <span className="icon-comment">{item.commentNum } Comments</span>
                                    <span className="icon-eye-open">{item.readNum} Views</span>
                                    <span className="icon-tag">{item.tag ? item.tag.name : 'null'}</span>
                                    <a href="javascript:;" className={ item.isLiked ? `icon-heart style.active` : 'icon-heart'}>{item.likeNum}</a>
                                </div>
                            </div>
                            <p className={style["preview"]}>
                                摘要: {item.previewText}

                            </p>
                            <div className={style["bottom"]}>
                                <a href="javascript:;" className={style["more"]}>{item.category ? item.category.name :'我可能被删了'}</a>
                                <a className={`icon-calendar ${style.more} no-border color-gray`}>{Helper.dateFormat(item.createTime, 'yyyy-MM-dd')}</a>
                                {item.lastEditTime && <a className={`icon-edit ${style.more} no-border color-gray`}>{Helper.dateFormat(item.lastEditTime, 'yyyy-MM-dd')}</a>}
                            </div>
                        </div>
                        {
                            !!item.poster && !isMobile && <div className={style["right"]}>
                                <div className={style["img"]}>
                                    <img src={CONFIG.POSTER_URL+'/'+item.poster} onLoad={autoSize} />
                                </div>
                            </div>
                        }
                    </div>
                ))
            }
            <div className="padding-20-0">
                {isShowMore && isMore && <a href="javascript:;" onClick={onLoadMore} className={style["more-btn"]}>More</a>}
                {isShowMore && !isMore && <p className="text-center color-gray padding-20-0">没有更多了</p>}
            </div>
        </div>
    )
}

export default ArticleList;
