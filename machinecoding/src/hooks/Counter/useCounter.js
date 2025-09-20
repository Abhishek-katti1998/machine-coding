
import { useEffect,useState,useRef,useReducer } from "react"
const timerReducer=(state,action)=>{
    switch(action.type){
        case "update":
            return {
                ...state,
                [action.unit]: action.payload ?? state[action.unit] - action.step
                   }
        default:
            throw Error('Invalid state action type')

    }
}

export default function useCounter({onComplete,autoStart=true,onTick,initialSec,initialMin,initialHr,step}){
    
    const timerRef=useRef(null);
    const [paused,setPaused]=useState(false);
    const format=(initialHr >0)?'hours':(initialMin>0?'minutes':'seconds');
    const [timerState,dispatch]=useReducer(timerReducer,{
        counter:initialSec,
        minCounter:initialMin,
        hrCounter:initialHr
    })
    const clearTimer=()=>{
        if(timerRef.current){
            clearInterval(timerRef.current);
            timerRef.current=null;
        }
    }
    const startBtnHandler=(event)=>{
        
        event.preventDefault();
        clearInterval(timerRef.current)
        timerRef.current=setInterval(decrementTimer,1000)

    }
    const pauseBtnHandler=(event)=>{
        event.preventDefault();
        clearTimer()
        setPaused(true);
    }
    const resumeBtnHandler=(event)=>{
       
        event.preventDefault();
        const isFinished =
        timerState.counter === 0 &&
        timerState.minCounter === 0 &&
        timerState.hrCounter === 0;
        if (isFinished) return;
        clearTimer()
        setPaused(false);
        timerRef.current=setInterval(decrementTimer,1000)
    }
    
    const resetHandler=(event)=>{
        event.preventDefault();
        clearTimer();
        dispatch({type:'update',payload:initialSec,unit:"counter"});
        dispatch({type:'update',payload:initialMin,unit:"minCounter"});
        dispatch({type:'update',payload:initialHr,unit:"hrCounter"});
        setPaused(false);
    
    }

    const decrementTimer=()=>{
        dispatch({type:'update',step,unit:"counter"});
    }
        
     useEffect(()=>{
        
        const isFinished =
        timerState.counter === 0 &&
        timerState.minCounter === 0 &&
        timerState.hrCounter === 0;
        
              if(isFinished){
                clearInterval(timerRef.current);
                onComplete?.('timer');
                return;
              }

              if(timerState.counter===0&&timerState.minCounter>0&&timerState.hrCounter===0){
                dispatch({type:'update',step:1,unit:"minCounter"});
                dispatch({type:'update',payload:59,unit:"counter"});
                return;
              }
              if(timerState.counter===0&&timerState.minCounter>=0&&timerState.hrCounter>0){
                dispatch({type:'update',step:1,unit:"hrCounter"});
                dispatch({type:'update',payload:59,unit:"minCounter"});
                dispatch({type:'update',payload:59,unit:"counter"});
                return;
              }
              if (timerState.counter < 0 && (timerState.minCounter > 0 || timerState.hrCounter > 0)) {
                const borrow = Math.ceil(Math.abs(timerState.counter) / 60);
                dispatch({type:'update',step:borrow,unit:"minCounter"});
                dispatch({type:'update',payload:((timerState.counter % 60) + 60) % 60,unit:"counter"});
                return;
              }
          
              // Borrow from hours if minutes < 0
              if (timerState.minCounter < 0 && timerState.hrCounter > 0) {
                const borrow = Math.ceil(Math.abs(timerState.minCounter) / 60);
                dispatch({type:'update',payload:((timerState.minCounter % 60) + 60) % 60,unit:"minCounter"});
                dispatch({type:'update',step:borrow,unit:"hrCounter"});
              }

        
              onTick?.(timerState)
           
     },[timerState.counter])
        
    useEffect(()=>{
        const hasTimeLeft = 
  timerState.counter > 0 || timerState.minCounter > 0 || timerState.hrCounter > 0;

            if(autoStart&&hasTimeLeft&& timerRef.current===null){
                timerRef.current=setInterval(decrementTimer,1000);
            }
            return ()=>{
               
        if(timerRef.current)clearInterval(timerRef.current)        
            }
    },[])

return {timerState,timerRef,paused,startBtnHandler,pauseBtnHandler,resumeBtnHandler,resetHandler,format};
}