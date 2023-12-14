'use client'
import RangeInput from './RangeInput'
import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
      {/* 标题 */}
      <h1 className={styles.h1}>css variables</h1>
        {/* 三个控件 */}
        <div className={styles.controls}>
          <RangeInput  description="Spacing" min="0" max="30"/>
          <RangeInput  description="Blur" min="0" max="20"/>
          <label className={styles.label} htmlFor="color">Base Color:</label>
          <input className={styles.input} id="color" type="color" value="#ffc600" onChange={handleColorChange}/>
      </div>
      {/* 图片 */}
      <img className={styles.img} src='/pic.jpg' alt="img not found"></img>
    </main>
  )
}

function handleColorChange(e){
  let variableName = "--imgBackground-color";
  let variableValue = e.target.value;
  document.documentElement.style.setProperty(variableName, variableValue);
}