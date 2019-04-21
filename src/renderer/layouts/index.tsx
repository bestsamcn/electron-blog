import React from 'react';
import { Header } from '@/components/layouts';
import { connect } from 'dva';
import { GlobalModelState } from '@/models/global';

@connect(({glboal}:any)=>({...global}))
export default class BaseLayout extends React.Component<any> {
	render(){
		return (
	    	<div>
	    		<Header />
	    		<div className="router-view">
	                {this.props.children}
	            </div>
	    	</div>
	    )
	}
};
