import React from 'react';
import { FACE_URL } from '@/config';
import style from './style.less';

class Emoji extends React.Component<any>{
	readonly state = {
		emojiList:[]
	}
	init(){
		let _emojiList = [];
		for(var i=1; i<=48; i++){
			_emojiList.push(i);
		}
		this.setState({emojiList:_emojiList});
	}
	render(){
		return(
			<div className={style["emoji"]}>
				{
					this.state.emojiList.map((item, index)=>(
						<a className="javascript:;" onClick={this.props.onFaceClick.bind(this, item)} key={index}>
							<img src={`${FACE_URL}/${item}.png`} />
						</a>
					))
				}
				
			</div>
		)
	}
	componentWillMount(){
		this.init();
	}
}


export default Emoji;