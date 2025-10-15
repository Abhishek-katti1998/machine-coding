import {useEffect, useRef} from "react";
export default function usePrevious(state) {

const ref=useRef();

useEffect(()=>{
    console.log('useEffect')
    ref.current=state; 
})
console.log('render')
return ref.current;



}