// leading throttling
import { useRef,useCallback } from "react";

function useLeading(delay){

const initialRef=useRef(0);


const throttled=useCallback((callback)=>{
    if(Date.now()-initialRef.current<delay){
        return;
    }
    else{
        initialRef.current=Date.now();
        callback('Throttle');
    }


},[delay]) 


return throttled;

}
export default useThrottle;
