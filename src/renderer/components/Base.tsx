import React from 'react';

export default class Base<P={}, S={}> extends React.Component<P, S>{
	public componentDidMount(){
		window.scrollTo(0, 0);
	}
}