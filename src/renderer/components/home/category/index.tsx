import React from 'react';
import style from './style.less';

interface IProps {
	children:React.ReactNode;
	categoryArticleGroup:any[];
	onCateClick:Function
}

const Category = ({children, categoryArticleGroup, onCateClick}:IProps)=>(
    <div className={`moveup ${style['home-category']}`}>
        { children }
        <div className={style["cont"]}>
            {
                categoryArticleGroup.map(item=>(
                    <a href="javascript:;" onClick={()=>onCateClick(item._id.name, 'category')} key={item._id._id}>
                        <span className={style["name"]}>{item._id && item._id.name}</span>
                        <span className={style["number"]}>({item.total || 0})</span>
                    </a>
                ))
            }
        </div>
    </div>
)

export default Category;
