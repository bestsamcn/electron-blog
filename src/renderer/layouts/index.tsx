import React from 'react';
import { Header, Footer, Menu, Loading } from '@/components/layouts';
import { connect } from 'dva';
import { withRouter } from 'umi';
import { GlobalModelState } from '@/models/global';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

interface IProps{
	isLogin:boolean,
	isLoading:boolean,
	token:string,
	msg:string,
	iShowMenu:boolean,
	routes:any[],
	global:any
}

@(withRouter as any)
@connect(({global}:any)=>({...global}))
export default class BaseLayout extends React.Component<IProps, any> {
	readonly state = {
		isResizeToMobile:false,
        routerName:''
	}
	onresizeWindow(){
        var cw:number = document.documentElement.clientWidth || document.body.clientWidth;
        if(cw >= 768){
            this.setState({isResizeToMobile:false});
        }else{
            this.setState({isResizeToMobile:true});
        }
    }
    setRouterName(name:string){
    	console.log(name, 'ddd')
        this.setState({routerName:name});
    }
    componentWillReceiveProps(nextProps:any) {
    	let { route:{routes} } = nextProps;
        this.setRouterName(routes[0].title);
    }
    componentWillMount(){
        this.onresizeWindow();
    }
	render(){
		const { isLogin, token, msg, iShowMenu, isLoading } = this.props;

		const { isResizeToMobile, routerName } = this.state;
		return (
	    	<div>
	    		<Header />
	    		<Loading isLoading={isLoading} />
	    		<ReactCSSTransitionGroup
                    transitionEnter={true}
                    transitionLeave={true}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    transitionName={{
                      enter: 'bounceInLeft',
                      leave: 'bounceOutLeft',
                    }}
                >
	    			{iShowMenu && isResizeToMobile && <Menu routerName={this.state.routerName}/>}
	    		</ReactCSSTransitionGroup>
	    		<div className="router-view">
	                {this.props.children}
	            </div>
	            <Footer />
	    	</div>
	    )
	}
};
