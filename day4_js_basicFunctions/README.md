##预览
![](https://raw.githubusercontent.com/XiYuXu/MyPictures/master/20231216235959.png)

## 思路
希望通过按钮实现表格数据的重新渲染，因此把发明家数据定义为state，按键事件更新数据即可

## 按钮事件对应核心函数
#### Array.prototype.filter()
**功能：** 过滤数据
```
/**filter参数为一个箭头函数，elment表示数组中每次遍历的元素（以下都是这样）
，函数体中返回过滤的条件,函数返回数组中满足过滤条件的新数组
方法不修改原数组*/
let sixteenthCenturyInventors = inventors.filter((element)=>{
    return element.year>=1500 && element.year<1600 ;
})
setInventors(sixteenthCenturyInventors);
```
#### Array.prototype.map()
**功能：** 将原数组映射为新数组
```
/**map参数为一个箭头函数，elment表示数组中每次遍历的元素，
函数体中返回由原数组元素改为新数组的元素,函数返回由每个新元素构成的数组
方法会修改原数组*/
let names = inventors.map(element=>{
    return {first:element.first,last:element.last};
})
```

#### Array.prototype.sort()
**功能：** 排序数据
```
/**sort参数为一个箭头函数，a和b表示数组元素，
函数体中a和b的比较属性为排序条件中的属性,函数返回的1与-1决定了升序或是逆序
方法会修改原数组*/
//array[int]数组升序排列
let array = [1,2,3,6,5];
array.sort((a,b)=>{
    if(a > b)
      return 1;
    else
      return -1;
})
//array{object}数组根据age降序排列
let array = [{age:6,name:'A'},{age:7,name:'B'},{age:9,name:'C'},{age:8,name:'D'}];
array.sort((a,b)=>{
    if(a.age > b.age)
      return -1;
    else
      return 1;
})
```
**注意：** 在更新state时，如果不用...解构赋值，直接temp=inventors。会发现state更新不成功
```
let temp = [...inventors];  //解构赋值
temp.sort((a,b)=>{
    if(a.passed-a.year > b.passed-b.year)
        return 1;
    else
        return -1;
})
setInventors(temp);
```

#### Array.prototype.reduce()
**功能：** 对数组生成汇总信息
```
/**sort函数的第一个参数为箭头函数，第二参数为待返回参数的初始值
箭头函数的第一个参数为待返回数据，第二个参数为element
函数通过每次对待返回参数进行更新并return，最终将把该汇总数据返回给等号的左值
方法不会修改原数组*/
//例：汇总发明家生存年数
let lives = inventors.reduce((total,element)=>{
    return element.passed-element.year + total; //生存年数+total
},0)

//例：汇总各单词出现次数
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car' ];
let results = data.reduce((result,element)=>{
    if(!result[element]){
        result[element] = 1;
    }else{
        result[element] += 1;
    }
    return result;
},{})
//console:{ car: 3, truck: 2, bike: 1, walk: 1 }
```
**注意：** 返回数据一定要在箭头函数中return，否则更新失败

### 总结
箭头函数必须return