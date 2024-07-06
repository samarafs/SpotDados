import React, { useState } from 'react'
import { IoIosLock } from 'react-icons/io'

const generateRandomColor = ()=> {
    const colorObj ={
        color: '#' + Math.floor(Math.random()*16777215).toString(16),
        block:false,
    }
    return colorObj
     
}



function HexadecimalColorGenerator() {
    const [color, setColor] =useState(Array(5).fill().map(()=> generateRandomColor()))
    
    const lockedColor=(col)=>{
       for(let colorObj of color){
        if(colorObj.color === col.color){
            col.block = true
        }
       }
       setColor([...color])
    }
    const generateNewRandomColor =()=>{
        setColor((preColor) => preColor.map((col) => {
            if(!col.block){
                return generateRandomColor()
            }
            return col
        }))
    }
    return (
    <div className='flex flex-col'>
        {
            color.map((col, index) => (
                <div onClick={() => {
                lockedColor(col)
                
                }} key={index} className={` flex justify-center items-center w-40 h-12  ${col.block ? ' border-black border-solid border-2' : ''}`} style={{backgroundColor: col.color}}>
                     {
                     col.block ? <IoIosLock size={25} /> :
                     col.color  } 
                </div>
            ))
        }
        <button className='bg-blue-300 border border-black rounded-md py-2 mt-4' onClick={generateNewRandomColor}>Generator</button>
    </div>
  )
}

export default HexadecimalColorGenerator