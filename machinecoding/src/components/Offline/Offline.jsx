import React, { useEffect, useState } from 'react'


export default function Offline(){
    const [count, setCount] = useState(() => {
        // Load cached value from localStorage
        return Number(localStorage.getItem("count")) || 0;
      });
    
      useEffect(() => {
        // Save value to localStorage whenever it changes
        localStorage.setItem("count", count);
      }, [count]);
    
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Offline React Demo</h1>
          <p>Counter (cached in localStorage): {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
      );
}

