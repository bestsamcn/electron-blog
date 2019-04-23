import React from 'react';
import Helper from '@/utils/filter';
import { Link } from 'umi';
import * as CONFIG from '@/config';
import { connect } from 'dva';
import style from './style.less';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface IProps{
	latestList:any[],
	commentList:any[],
	hotList:any[],
	readNumList:any[]
}
@connect(({home}:any)=>({...home}))
class Rank extends React.Component<IProps, any>{
    readonly state = {
        activeIndex:1
    }

    //切换
    navClick(i:number){
        this.setState({activeIndex:i});
    }
    render(){
    	const { latestList, commentList, hotList, readNumList } = this.props;
        return (

            <div className={`moveup ${style['article-rank']} margin-top-30`}>
                <div className={style["tab-list"]}>
                    <a href="javascript:;" className={this.state.activeIndex === 1 && style.active || ''} onClick={()=>this.navClick(1)}>最新</a>
                    <a href="javascript:;" className={this.state.activeIndex === 2 && style.active || ''} onClick={()=>this.navClick(2)}>最火</a>
                    <a href="javascript:;" className={this.state.activeIndex === 3 && style.active || ''} onClick={()=>this.navClick(3)}>评论</a>
                    <a href="javascript:;" className={this.state.activeIndex === 4 && style.active || ''} onClick={()=>this.navClick(4)}>阅读</a>
                </div>
                <div className={style["tab-cont"]}>
                    <ReactCSSTransitionGroup
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionName={{
                          enter: 'bounceInRight',
                          leave: 'bounceOutLeft',
                        }}
                    >
                    {
                    this.state.activeIndex === 1 && <div className={`animated ${style.popular}`}>
                        {
                            latestList.map((item:any)=>(
                                <Link to={`/article/detail/${item._id}`} key={item._id}>
                                    <div className={style["img"]}>
                                        <div className={style["img-box"]}>
                                            {!!item.poster && <img  src={`${CONFIG.POSTER_URL}/${item.poster}`} />}
                                            {!item.poster && <span>{Helper.textEllipsis(item.title,2,true)}</span>}
                                        </div>
                                    </div>
                                    <div className={style["text"]}>
                                        <h4>{item.title}</h4>
                                        <p><i className="icon-edit"></i>{Helper.dateFormat((item.lastEditTime ? item.lastEditTime : item.createTime), 'yyyy-MM-dd')}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    }
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionName={{
                          enter: 'bounceInRight',
                          leave: 'bounceOutLeft',
                        }}
                    >
                    {
                    this.state.activeIndex === 2 && <div className={`animated ${style.popular}`}>
                        {
                            hotList.map((item:any)=>(
                                <Link to={`/article/detail/${item._id}`} key={item._id}>
                                    <div className={style["img"]}>
                                        <div className={style["img-box"]}>

                                            {!!item.poster && <img  src={`${CONFIG.POSTER_URL}/${item.poster}`} />}
                                            {!item.poster && <span>{Helper.textEllipsis(item.title,2,true)}</span>}
                                        </div>
                                    </div>
                                    <div className={style["text"]}>
                                        <h4>{item.title}</h4>
                                        <p><i className="icon-calendar"></i>{Helper.dateFormat(item.createTime, 'yyyy-MM-dd')}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                    }
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionName={{
                          enter: 'bounceInRight',
                          leave: 'bounceOutLeft',
                        }}
                    >
                    {
                    this.state.activeIndex === 3 && <div className={`animated ${style.popular}`}>
                        {
                            commentList.map((item:any)=>(
                                <Link to={`/article/detail/${item._id}`} key={item._id}>
                                    <div className={style["img"]}>
                                        <div className={style["img-box"]}>
                                            <span>{Helper.textEllipsis(item.createLog.createName, 3,true)}</span>
                                        </div>
                                    </div>
                                    <div className={style["text"]}>
                                        <h4>RE:{item.parentComent ? item.parentComment.content : item.article.title}</h4>
                                        <p><i className="icon-calendar"></i>{Helper.dateFormat(item.createTime, 'yyyy-MM-dd')}</p>
                                    </div>
                                </Link>
                                ))
                            }
                    </div>
                    }
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup
                        transitionEnter={true}
                        transitionLeave={true}
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                        transitionName={{
                          enter: 'bounceInRight',
                          leave: 'bounceOutLeft',
                        }}
                    >
                    {
                    this.state.activeIndex === 4 && <div className={`animated ${style.popular}`}>
                        {
                            readNumList.map((item:any)=>(
                                <Link to={`/article/detail/${item._id}`} key={item._id}>
                                    <div className={style["img"]}>
                                        <div className={style["img-box"]}>
                                            {!!item.poster && <img  src={`${CONFIG.POSTER_URL}/${item.poster}`} />}
                                            {!item.poster && <span>{Helper.textEllipsis(item.title,2,true)}</span>}
                                        </div>
                                    </div>
                                    <div className={style["text"]}>
                                        <h4>{item.title}</h4>
                                        <p><i className="icon-calendar"></i>{Helper.dateFormat(item.createTime, 'yyyy-MM-dd')}</p>
                                    </div>
                                </Link>
                                ))
                            }
                    </div>
                    }
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        )
    }
}
export default connect()(Rank);
