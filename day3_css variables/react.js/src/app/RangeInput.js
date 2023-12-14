'use client'
import styles from "./page.module.css"

//修改全局css变量
function handleMouseMove(e){
    let variableName = "--img-"+e.target.id.toLowerCase();
    let variableValue = e.target.value+"px";
    document.documentElement.style.setProperty(variableName, variableValue);
}

export default function RangeInput({description,min,max}){
    return (
        <span>
            {/* 利用label的for字段对应input的id字段进行绑定 */}
            <label className={styles.label} htmlFor={description}>{description}</label>
            {/* 利用min和max属性实现range型input构建滑块 */}
            <input id={description} type="range" min={min} max={max} onMouseMove={handleMouseMove} className={styles.input}/>
        </span>
    )            
}