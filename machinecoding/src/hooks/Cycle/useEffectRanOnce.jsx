import { useEffect, useRef } from "react"
export default function useEffectRanOnce(effect){

    const ref=useRef(false);
    useEffect(()=>{
        if(ref.current)return;
        ref.current=true;
        effect();
    },[])

}