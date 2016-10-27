
//绘制多边形
var Point = function(x,y){               //x,y:为鼠标按下时的坐标位置
    this.x = x;
    this.y = y;
};

/**
 * @param centerX
 * @param centerY
 * @param radius
 * @param sides
 * @param startAngle
 * @param fillStr
 * @param strokeStr
 * @param filled
 * @constructor
 */
var Polygon = function(centerX,centerY,radius,sides,startAngle,fillStr,strokeStr,filled){   //构造函数
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.sides = sides;
    this.startAngle = startAngle;
    this.fillStr = fillStr;
    this.strokeStr = strokeStr;
    this.filled = filled;
};
Polygon.prototype = {                           //在原型中添加方法
    getPoints:function(){
        var points = [];
        var angle = this.startAngle * Math.PI/180 || 0;     //开始角度
        for(var i = 0; i< this.sides; i++){    //遍历多边形的边数；并求出多边形每个点的坐标位置
            angle += 2*Math.PI / this.sides;   //多边形每个顶点的角度
            points.push(new Point(this.x + this.radius * Math.sin(angle),
                this.y - this.radius * Math.cos(angle))
            );
        }
        return points;                          //返回每个顶点坐标位置
    },
    createPoint:function(ct){
        var points = Array.prototype.slice.call(this.getPoints());         //获取多边形每个顶点坐标位置
        ct.beginPath();
        ct.strokeStyle = this.strokeStr;
        ct.moveTo(points[0].x,points[0].y);
        for(var i = 1; i< points.length;i++){
            ct.lineTo(points[i].x,points[i].y);
        }
        ct.closePath();
    },
    stroke:function(ct){
        ct.save();                              //保存画布之前的状态，方便保存后的操作；
        ct.strokeStyle = this.strokeStr;
        this.createPoint(ct);
        ct.stroke();
        ct.restore();
    },
    fill:function(ct){
        if(this.filled){
            ct.save();
            ct.fillStyle = this.fillStr;
            this.createPoint(ct);
            ct.fill();
            ct.restore();
        }
    },
    move:function(x,y){
        this.x = x;
        this.y = y;
    }
}