import React, { useEffect, useState } from 'react';
import Counter from './components/Counter';
import Offline from './components/Offline/Offline';
import TimerCounter from './components/TimerCounter';
function App() {


 

  return <>
<button onClick={()=>{setShow(p=>!p)}}>toggle</button>
{<TimerCounter
step={4}
initialSec={40}
onComplete={(param)=>{
console.log(param+'completed')
}} onTick={(tick)=>{
  // console.log('tick tick',tick)
}}/>}
  
  </> 
    
  
}

export default App
