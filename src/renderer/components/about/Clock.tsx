import React from 'react';
import $$ from '@/utils';

const inlinestyle = {visibility:"hidden" as "hidden" ,opacity:0}
class Clock extends React.Component{
    el:any;
    componentDidMount() {
        setTimeout(()=>{
            $$.Clock.init(this.el);
        }, 500);
    }
    render(){

        return(
            <div className="">
                <canvas width="300" height="180" ref={ref=>this.el = ref} id="canvas"><p className="nope">No canvas, no particles</p></canvas>
                <div id="about">
                    <a href="#" style={inlinestyle} id="toggle-options"></a>
                    <ul id="options" style={{visibility:"hidden" as "hidden", opacity:0}}>
                        <li><a href="#" id="quivers" className="">Quiver</a></li>
                        <li><a href="#" id="gradient" className="on">Gradient</a></li>
                        <li><a href="#" id="color" className="on">Colorize</a></li>
                        <li><a href="#" id="valentineify" className="">Valentine-ify</a></li>
                        <li className="group"><span>Mouse down: explode and repel</span></li>
                        <li><span>Mouse down + shift: explode and attract</span></li>
                        <li><span>Arrow Up: increase particle size</span></li>
                        <li className="group"><span>Sorry about your CPU</span></li>
                        <li><span id="fps"></span></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Clock;
