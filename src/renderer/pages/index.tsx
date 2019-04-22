/**
 * title: 首页
 */
import React from 'react';
import { formatMessage } from 'umi-plugin-locale';
import { remote } from 'electron';
import CircleProgress from '@/components/circleProgress';


export default class Home extends React.Component {
    render(){
        const a: string = 's';
        const { window } = remote.getGlobal('services');
        return (
            <div className="">
            </div>
        );
    }
}
