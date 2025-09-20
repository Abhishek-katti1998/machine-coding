import React, { useEffect, useState } from 'react';
import Counter from './components/Counter';
import Offline from './components/Offline/Offline';
import TimerCounter from './components/TimerCounter';
function App() {

  const [show,setShow]=useState(false);

 

  return <>

<button onClick={()=>{setShow(p=>!p)}}>toggle</button>
{show&&<TimerCounter
initialHr={1}
initialMin={1}
initialSec={5}
// step={10}
onComplete={(param)=>{
console.log(param+'completed')
}} onTick={(tick)=>{
  console.log('tick tick',tick)
}}/>}
  
  </> 
    
  
}

export default App
