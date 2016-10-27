
//���ƶ����
var Point = function(x,y){               //x,y:Ϊ��갴��ʱ������λ��
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
var Polygon = function(centerX,centerY,radius,sides,startAngle,fillStr,strokeStr,filled){   //���캯��
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.sides = sides;
    this.startAngle = startAngle;
    this.fillStr = fillStr;
    this.strokeStr = strokeStr;
    this.filled = filled;
};
Polygon.prototype = {                           //��ԭ������ӷ���
    getPoints:function(){
        var points = [];
        var angle = this.startAngle * Math.PI/180 || 0;     //��ʼ�Ƕ�
        for(var i = 0; i< this.sides; i++){    //��������εı���������������ÿ���������λ��
            angle += 2*Math.PI / this.sides;   //�����ÿ������ĽǶ�
            points.push(new Point(this.x + this.radius * Math.sin(angle),
                this.y - this.radius * Math.cos(angle))
            );
        }
        return points;                          //����ÿ����������λ��
    },
    createPoint:function(ct){
        var points = Array.prototype.slice.call(this.getPoints());         //��ȡ�����ÿ����������λ��
        ct.beginPath();
        ct.strokeStyle = this.strokeStr;
        ct.moveTo(points[0].x,points[0].y);
        for(var i = 1; i< points.length;i++){
            ct.lineTo(points[i].x,points[i].y);
        }
        ct.closePath();
    },
    stroke:function(ct){
        ct.save();                              //���滭��֮ǰ��״̬�����㱣���Ĳ�����
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