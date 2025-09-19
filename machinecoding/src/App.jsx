import React, { useEffect, useState } from 'react';
import Counter from './components/Counter';
function App() {

  const [cnt,setCnt]=useState(undefined)

 

  return <Counter
  value={cnt}
  initialValue={2}
  
  />
    
  
}

export default App
