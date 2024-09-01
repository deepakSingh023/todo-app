import React from 'react'
import './App.css'
import {useState} from 'react'
import axios from 'axios'


function Create() {
  const onclickHandler=()=>{
    axios.post('http://localhost:3001/add',{task:task})
    .then(result=>console.log(result))
    .catch(err=>console.log(err))

  }
  
  const[task,setTask]=useState() 
  return (
    <div className="center_form">
        <input type="text" placeholder="enter the task" onChange={(e)=>setTask(e.target.value)}/>
        <button type="button" onClick={onclickHandler} >click me</button>
      
    </div>
  )
}

export default Create
