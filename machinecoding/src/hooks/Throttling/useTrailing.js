import { useRef,useCallback, useEffect } from "react";
function useTrailing(delay,callback){

const lastArgs=useRef(null);
const lastSavedCallback=useRef(null);
const timer=useRef(null);

useEffect(()=>{
lastSavedCallback.current=callback;
},[callback])

useEffect(()=>{
    return ()=>{
        if(timer.current){
            clearTimeout(timer.current);
        }
    }
},[])

return useCallback((...args)=>{
    lastArgs.current=args;

   if(!timer.current){
     timer.current=setTimeout(()=>{
        timer.current=null;
        if(lastArgs.current){
            lastSavedCallback.current(...lastArgs.current)
            lastArgs.current=null;
        }
     },delay)
   }

},[delay])


}

export default useThrottle;