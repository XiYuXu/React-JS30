## cavans画图心得
> cavans画图的本质就是确定几个锚点，构成形状，然后对形状进行描边或者填充。
### 画图工具设置
```
ctx.strokeStyle = 'blue';    //设置画笔颜色（画线）
ctx.fillStyle = 'blue';      //设置油漆桶颜色（填充）
```
#### 1.画直线
```
ctx.beginPath();        //表明用的是路径绘制
ctx.moveTo(100,100);    //移动到某个绘图原点（不可省略）
ctx.lineTo(1300, 1300); //从上一步的原点绘制到目的点
```
##### 1.1绘制参考坐标轴
```
/******cavans绘制坐标轴*******/
for(i=100;i<=1300;i+=100){
    //画横线
    ctx.beginPath();
    ctx.moveTo(100,i);
    ctx.lineTo(1300, i);
    ctx.stroke(); 
    //标距离
    ctx.font = "24px serif";
    ctx.fillText(i, 50, i);
}
for(let i=100;i<=1600;i+=100){
    //画竖线
    ctx.beginPath();
    ctx.moveTo(i,100);
    ctx.lineTo(i, 1600);
    ctx.stroke(); 
    //标距离
    ctx.font = "24px serif";
    ctx.fillText(i, i-20, 85);
}
```
#### 2.画扇形或圆
> 需要5个参数（圆心，半径，起始弧度，终止弧度，顺时针还是逆时针画）
> 在这个库中以x轴正半轴为0弧度，y正半轴为3/2派弧度或负的1/2派弧度，以此类推
```
ctx.beginPath();      //表明根据路径绘制图形
ctx.moveTo(500,500);  //固定圆心,这一步不可省略
/**圆心为500，500，半径100，从负四分之派到0弧度,顺序为顺时针***/
ctx.arc(500, 500, 100, -1/4*Math.PI, 0 ,false);
```
##### 2.1画环
> 画环的思路就很简单了，首先画一个扇形，用需要的颜色填充。再画一个半径小点的、起止弧度一样的、填充背景色的扇形。
```
/**** 画个红色扇形，背景色为白色，用白色消除半径小的部分圆 *****/
//初始弧形
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.moveTo(500,500);//圆心设置不可省略
ctx.arc(500, 500, 100, -1/4*Math.PI,hour_rad ,false); 
ctx.fill();

//消除弧形
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.moveTo(500,500);//圆心设置不可省略
ctx.arc(500, 500, 70, -1/4*Math.PI,hour_rad,false); 
ctx.fill();
```
但是这样子会出现一个情况，那就是我们画的扇形其实是有边框的扇形。所以用白色扇形消除的时候会留下一条线清除不掉就像下面这样。而且本人也没有找到关于无边框绘制的文档。我试图用两个strokeStyle = 'white',可以消除右边的红色线，但仍然无法消除左边这条红色线

![](https://raw.githubusercontent.com/XiYuXu/MyPictures/master/20231206235324.png)


然而可以沿用消除的思想，画两条底色线把两条红色盖住不就行了。但是这两个点的坐标就要稍微难求点了。转念一想，可以再画一个边框为底色的扇形，在画到扇形圆弧的终点的时候，用一个lineTo把线连接到圆心就行了，所以
```
/**以画小扇形边框的方式消除两条红线**/
ctx.strokeStyle = 'white';   //设置画线颜色为底色，这里是白色
ctx.moveTo(500,500);         //圆心设置不可省略
/***与之前用作消除的扇形一样，确定了扇形弧面上的终点，画上连接圆心的直线***/
ctx.arc(500, 500, 70, -1/4*Math.PI,hour_rad,false); 
ctx.lineTo(500,500); 
ctx.stroke(); //绘制路径
```
得到
![](https://raw.githubusercontent.com/XiYuXu/MyPictures/master/20231207000442.png)
里面还有黑线不用管啦，哈哈哈哈，反正画完了图边框是要注释掉的


#### 3.消除绘图锯齿感
学的别人的代码，放上去确实可以消除锯齿
```
 let width = canvas.width;
 let height=canvas.height;
 if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio;
        canvas.width = width * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}
```
