import React from 'react';
import PropTypes from 'prop-types';
import style from './style.less';

interface IProps{
	children:React.ReactNode,
	tagArticleGroup:any[],
	onTagClick:Function
}
const Tag = ({children, tagArticleGroup, onTagClick}:IProps)=>(
    <div className={`"moveup ${style.tags} margin-top-30`}>
        {children}
        <div className={style["cont"]}>
            <div className={`${style.wrapper} padding-0`}>
            	{
            		tagArticleGroup.map(item=>(
            			<a href="javascript:;" onClick={()=>onTagClick(item._id && item._id.name, 'tag')} className={style["tag-item"]}  key={item._id._id}>
		                    <span>{item._id && item._id.name}</span>
		                </a>
            		))
            	}
            </div>
        </div>
    </div>
)
export default Tag;
