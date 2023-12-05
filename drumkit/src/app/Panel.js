'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import pianoKeys from './PianoKes';

let initPlayKeys = {};
for(let element of pianoKeys){
  initPlayKeys[element.key] = false;
}

export default function Panel(){
   //初始化state
  const [playKeys,setPlayKeys] = useState(initPlayKeys);
  //按下按键，更新state，并播放音乐
  function handleKeyDown(e){
    //更新state
    let array = { ...playKeys };
    array[e.key.toUpperCase()] = true;
    setPlayKeys(array);

    //播放音乐
    let selector = `audio[data-key='${e.key.toUpperCase().charCodeAt()}']`;
    const audio = document.querySelector(selector);
    console.log(audio);
    if(!audio)
     return;
    audio.currentTime = 0; //把audio的初始时间置为0.使得每次按下按键都会重新播放音乐，否则会播放到没有声音的片段
    audio.play();
  }
  //按键抬起，更新state
  function handleKeyUp(e){
    let array = { ...playKeys };
    array[e.key.toUpperCase()] = false;
    setPlayKeys(array);
  }
  //添加按键监听
  useEffect(()=>{
    window.addEventListener('keydown',handleKeyDown);
    window.addEventListener('keyup',handleKeyUp);
    return ()=>{window.removeEventListener('keydown',handleKeyDown);window.removeEventListener('keyup',handleKeyUp);};
  },[playKeys]);
 
  
  //根据state中的是否播放字段决定ui样式
  return pianoKeys.map(pianoKey=>(
        <div className={playKeys[pianoKey.key]?`${styles.buttons} ${styles.playing}`:styles.buttons} key={pianoKey.description}>
          <kbd className={styles.panelKey}>{pianoKey.key}</kbd>
          <span className={styles.description}>{pianoKey.description}</span>
        </div>
  ));
  
  
}
