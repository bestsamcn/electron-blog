import React from 'react';
import './style.less';

interface IProps{
    total?:number,
    current?:number,
    text?:string,
    color:number[],
    size:number
}

interface IState{

}

const M = window.Math;
const Sin = M.sin;
const Cos = M.cos;
const Sqrt = M.sqrt;
const Pow = M.pow;
const PI = M.PI;
const Round = M.round;
export default class CircleProgress extends React.Component<IProps, IState>{
    canvas:any;
    ctx:any;
    initText = 0;

    //线宽
    lineWidth = 2;
    static defaultProps = {
        color:[18, 142, 232, 1],
        total:100,
        current:50,
        text:'人',
        size:200
    }

    componentDidMount(){
        setTimeout(()=>this.init(), 500);
    }

    init(){
        this.oW = this.props.size;
        this.oH = this.props.size;
        const canvas = this.canvas;
        this.ctx  = canvas.getContext("2d");
        this.oRangeValue = this.props.current;
       
        canvas.width = this.oW;
        canvas.height = this.oH;

        // 大半径
        this.r = (this.oW / 2);
        this.cR = this.r - 10*this.lineWidth;
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;

        // 水波动画初始参数
        this.axisLength = 2*this.r - 16*this.lineWidth;  // Sin 图形长度
        this.unit = this.axisLength / 9; // 波浪宽
        this.range = 0.4 // 浪幅
        this.nowrange = this.range;  
        this.xoffset = 8*this.lineWidth; // x 轴偏移量
        this.data = (this.oRangeValue) / this.props.total;   // 数据量
        this.sp = 0; // 周期偏移量
        this.nowdata = 0;
        this.waveupsp = 0.006; // 水波上涨速度

        // 圆动画初始参数
        this.arcStack = [];  // 圆栈
        this.bR = this.r-8*this.lineWidth;
        this.soffset = -(PI/2); // 圆动画起始位置
        this.circleLock = true; // 起始动画锁


        // 获取圆动画轨迹点集
        for(var i = this.soffset; i< this.soffset + 2*PI; i+=1/(8*PI)) {
            this.arcStack.push([
                this.r + this.bR * Cos(i),
                this.r + this.bR * Sin(i)
            ]);
        }

        // 圆起始点
        this.cStartPoint = this.arcStack.shift();  
        this.ctx.strokeStyle = "red";
        this.ctx.moveTo(this.cStartPoint[0], this.cStartPoint[1]);
        this.renderCircle();
    }

    //画波浪
    drawSine () {
        this.ctx.beginPath();
        this.ctx.save();
        var Stack = []; // 记录起始点和终点坐标
        for (var i = this.xoffset; i<=this.xoffset + this.axisLength; i+=20/this.axisLength) {
            var x = this.sp + (this.xoffset + i) / this.unit;
            var y = Sin(x) * this.nowrange;
            var dx = i;
            var dy = 2*this.cR*(1-this.nowdata) + (this.r - this.cR) - (this.unit * y);
            this.ctx.lineTo(dx, dy);
            Stack.push([dx,dy])
        }
        // 获取初始点和结束点
        var startP = Stack[0];
        var endP = Stack[Stack.length - 1];
        this.ctx.lineTo(this.xoffset + this.axisLength,this.oW);
        this.ctx.lineTo(this.xoffset, this.oW);
        this.ctx.lineTo(startP[0], startP[1]);
        let color = this.props.color;
        this.ctx.strokeStyle = `rgba(${color[0]},${color[1]}, ${color[2]}, ${color[3]-0.6})`;
        this.ctx.fillStyle = `rgba(${color[0]},${color[1]}, ${color[2]}, ${color[3]-0.6})`;
        this.ctx.fill();
        this.ctx.restore();
    }

    //中间文字
    drawText () {
        this.ctx.globalCompositeOperation = 'source-over';
        var size = 0.4*this.cR;
        this.ctx.font = 'bold ' + size + 'px Microsoft Yahei';
        if(this.initText < this.props.current){
            this.initText++;
        }
        var txt = this.initText+' '+this.props.text;
        var fonty = this.r + this.size/2;
        var fontx = this.r - this.size * 0.8;
        this.ctx.fillStyle = "#ffffff";
        this.ctx.textAlign = 'center';
        this.ctx.fillText(txt, this.r+5, this.r+20)
    }

    //最外面淡黄色圈
    drawCircle(){
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = '#434343';
        this.ctx.arc(this.r, this.r, this.cR+7, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.restore();
    }

    //灰色圆圈
    grayCircle(){
        this.ctx.beginPath();
        this.ctx.lineWidth = this.props.size*0.06;
        this.ctx.strokeStyle = '#2f3035';
        this.ctx.arc(this.r, this.r, this.cR-5, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.restore();
        this.ctx.beginPath();
    }

    //橘黄色进度圈
    orangeCircle(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgba('+this.props.color.join(',')+')';

        //使用这个使圆环两端是圆弧形状
        this.ctx.lineCap = 'round';
        this.ctx.arc(this.r, this.r, this.cR-5,0 * (Math.PI / 180.0) - (Math.PI / 2),(this.nowdata * 360) * (Math.PI / 180.0) - (Math.PI / 2));
        //this.ctx.strokeStyle = "rgb("+(255-this.oRangeValue*0.5)+", 255, "+(255-this.oRangeValue*0.5)+")";
        this.ctx.stroke();
        this.ctx.save()
    }

    //裁剪中间水圈
    clipCircle(){
        this.ctx.beginPath();
        this.ctx.arc(this.r, this.r, this.cR-10, 0, 2 * Math.PI,false);
        this.ctx.clip();
    }

    //渲染canvas
    renderCircle () {
        this.ctx.clearRect(0, 0, this.oW, this.oH);

        //最外面淡黄色圈
        this.drawCircle();

        //灰色圆圈  
        this.grayCircle();

        //橘黄色进度圈
        this.orangeCircle();

        //裁剪中间水圈  
        this.clipCircle();
  
        if (this.data >= 0.85) {
            if (this.nowrange > this.range/4) {
                var t = this.range * 0.01;
                this.nowrange -= t;   
            }
        } else if (this.data <= 0.1) {
            if (this.nowrange < this.range*1.5) {
                var t = this.range * 0.01;
                this.nowrange += t;   
            }
        } else {
            if (this.nowrange <= this.range) {
                var t = this.range * 0.01;
                this.nowrange += t;   
            }      
            if (this.nowrange >= this.range) {
                var t = this.range * 0.01;
                this.nowrange -= t;
            }
        }
        if((this.data - this.nowdata) > 0) {
            this.nowdata += this.waveupsp;      
        }
        if((this.data - this.nowdata) < 0){
            this.nowdata -= this.waveupsp
        }
        this.sp += 0.07;

        // 开始水波动画
        this.drawSine();

        // 写字
        this.drawText();  
        requestAnimationFrame(this.renderCircle.bind(this))
    }
    render(){
        return <canvas ref={ref=>this.canvas=ref}>当前浏览器不支持canvas，请更换chrome浏览器</canvas>
    }
}


  
  