import React, { useState } from 'react'
import "../switchTabs/style.scss"
const SwitchTabs = ({ data, onTabChange }) => {
    const [left, setLeft] = useState(0);  //0 is index of first element of data
    const [selectedTab, setSelectedTab] = useState(0);   //0 is index of first element of data
    function tabChanged(tab,index){
        setLeft(100* index);
        setSelectedTab(index);
        setTimeout(() => {
            onTabChange(tab);
        }, 300);
    }
    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((tab, index) => {
                    return <span
                        key={index}
                        className={`tabItem ${index===selectedTab ? "active" :""}`}
                        onClick={()=>tabChanged(tab,index)}
                    >{tab}</span>
                })}
                <span className='movingBg' style={{left:left}}></span>
            </div>
        </div>
    )
}

export default SwitchTabs