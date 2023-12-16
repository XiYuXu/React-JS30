'use client';
import styles from './page.module.css'
import React, { useState } from 'react';
import { Button,List } from 'antd';

/*****发明家原始数据*****/
const inventorsData = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

//页面渲染
export default function Home() {
  // state，在列表的dataSource中用于更新数据
  let [inventors,setInventors] = useState(inventorsData);
  let [onlyshowName,setOnlyShowName] = useState(false);
  let [inventorsLives,setInventorsLives] = useState(false);
    

  // 查找16世纪的发明家
  function searchSixteenthCenturyInventors(){
    let sixteenthCenturyInventors = inventors.filter((element)=>{
      return element.year>=1500 && element.year<1600 ;
    })
    setInventors(sixteenthCenturyInventors);
  }  

  //获取发明家姓名
  function getInventorsName(){
    // 返回发明家姓名数组
    // let names = inventors.map(element=>{
    //   return {first:element.first,last:element.last};
    // })
    // console.log(names);
    setOnlyShowName(!onlyshowName);
  }

  //根据出生日期排序
  function sortByBirthdate(){
    //必须使用解构赋值进行拷贝，直接temp=inventors不行
    let temp = [...inventors];
    setInventors(temp.sort((a,b)=>a.year-b.year>0?1:-1));
  }

  //获取全部发明家的存活年数
  function getInventorsLives(){
    let lives = inventors.reduce((total,element)=>{
      return element.passed-element.year + total;
    },0)
    console.log(lives);
    setInventorsLives(lives);
  }  
  //根据寿命排序
  function sortByLives(a,b){
    let temp = [...inventors];
    temp.sort((a,b)=>{
      if(a.passed-a.year > b.passed-b.year)
        return 1;
      else
        return -1;
    })
    setInventors(temp);
  }

  return (
    <main className={styles.main}>
      <div className={styles.buttonGroup}>
        {/* Array.prototype.filter() */}
        {/* 1. Filter the list of inventors for those who were born in the 1500's */}
        <Button type="primary" onClick={searchSixteenthCenturyInventors}>16世纪的发明家</Button>

        {/* Array.prototype.map()
        2. Give us an array of the inventor first and last names */}
        <Button type="primary" onClick={getInventorsName}>获取发明家姓名</Button>

        {/* Array.prototype.sort()
        3. Sort the inventors by birthdate, oldest to youngest */}    
        <Button type="primary" onClick={sortByBirthdate}>根据出生日期排序</Button>

        {/* Array.prototype.reduce()
        4. How many years did all the inventors live? */}
        <Button type="primary" onClick={getInventorsLives}>发明家统共活了多少岁</Button>

        {/* 5. Sort the inventors by years lived */}
        <Button type="primary" onClick={sortByLives}>根据发明家寿命排序</Button>


      </div>
      <div className={styles.list}>
        <List
          size="small"
          itemLayout="horizontal"
          dataSource={inventors}
          renderItem={(item, index) => (
            <List.Item>
              <div>{item.first+" "+item.last}</div>
              {!onlyshowName && <div>{item.year+"-"+item.passed}</div>}
            </List.Item>
          )}
            header = {<h1>发明家统共活了:{inventorsLives>0?inventorsLives:'?'}年</h1>}
            footer = {<div>一些其他函数大差不差不予展示，见笔记文档即可</div>}
        />
      </div>
    </main>
  )
}
