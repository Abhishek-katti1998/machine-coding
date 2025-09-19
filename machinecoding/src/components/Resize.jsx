import { useEffect } from "react";
import useThrottle from "../hooks/Throttling/useLeading";


function Resize(){

    const throttleFoo=useThrottle(1000,(param)=>{console.log(param)});

    const resizeHandler=(e)=>{throttleFoo('Resize called')}
    useEffect(()=>{
        window.addEventListener('resize',resizeHandler)
        return ()=>{
            window.removeEventListener('resize',resizeHandler);
        }
        
    },[])
}

export default Resize;