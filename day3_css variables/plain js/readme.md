## 最终效果
![](https://raw.githubusercontent.com/XiYuXu/MyPictures/master/20231213134102.png)

## 核心思路
在root中定义css变量，分别代表内边距的padding，模糊程度的blur以及颜色color。在控制三个控件时，js利用内置的函数修改css变量，从而达到使用了css变量的html元素。

## 必知必会
#### 1.定义与使用CSS变量
```
/* 定义三个变量，以--开头 */
:root{
    --border-color: #ffc600;
    --border-spacing: 20px;
    --img-blur: 10px;
}
/* 利用var()使用三个变量 */
img{
    padding: var(--border-spacing);
    filter: blur(var(--img-blur));
    background-color: var(--border-color);
}
```
#### 输入控件的使用
```
<!-- 利用label的for字段对应input的id字段进行绑定 -->
<label for="spacing">Spacing</label>
<!--利用min和max属性实现range型input构建滑块-->
<input id="spacing" type="range" min="0" max="40"/>

<!--利用type="color"构建颜色选择器，通过value属性赋初值-->
<label for="color">Base Color</label>
<input id="color" type="color" value="#ffc600"/>

<!--调整图片的模糊程度-->
img{
    filter: blur(10px);
}
```
注意，若未给滑块设置初始值，即value属性，则滑块默认以min+max进行初始赋值

#### js操控css变量
```
/*为操作控件绑定处理函数*/
let color = document.querySelector("#color");
color.addEventListener("change",handleColorChange); //颜色选择器的触发事件类型为change

let blur = document.querySelector("#blur");
blur.addEventListener("mousemove",handleBlurMove);//滑块类选择器触发事件类型为mousemove,如果在这里用change事件的话，会发现按住鼠标左键拖动是不会触发修改的

/******
修改:root中定义的css变量
document.documentElement代表:root元素,setProperty为修改css的固定搭配
第一个参数为css变量名，第二个参数为变量值
******/
document.documentElement.style.setProperty('--border-color', this.value);

/*读取:root中定义的css变量*/
getComputedStyle(document.documentElement).getPropertyValue('--border-color');

/*颜色修改处理函数*/
function handleColorChange(){
    //this.value代表修改后的值，可用console.dir(this)查阅该对象内容
    document.documentElement.style.setProperty('--border-color', this.value);
}
/*滑块型控件修改处理函数*/
function handleBlurMove(){
    //由于模糊程度filter与padding属性都属于带单位属性，故调用this.value时要加上单位，否则修改无效
    let blur = this.value+"px";
    document.documentElement.style.setProperty('--img-blur', blur);
}
```
