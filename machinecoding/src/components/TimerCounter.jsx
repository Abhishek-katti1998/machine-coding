
import useCounter from "../hooks/Counter/useCounter"
const TimerFormat=({type="seconds",counter,minCounter,hrCounter})=>{

 switch(type){
    case "seconds":
        return <p aria-live="assertive">{`time remaining:${counter}`}</p>
    case "minutes":
        return <p aria-live="assertive">{`time remaining:${minCounter}:${counter}`}</p>
    case "hours":
        return <p aria-live="assertive">{`time remaining:${hrCounter}:${minCounter}:${counter}`}</p>
    default :
     throw Error('Invalid Counter Format')
    
 }

}
export default function TimerCounter(props){

const {initialSec=10,initialMin=0,initialHr=0,step=1,autoStart=true}=props


if(initialHr<0||initialMin<0||initialSec<0){
    throw new Error('Provide valid initial counter format');
}
if(step<0){
    throw new Error('provide step value > 0 ')
}


const {timerState,timerRef,paused,startBtnHandler,pauseBtnHandler,resumeBtnHandler,resetHandler,format}=useCounter({...props,
    initialSec,
    initialMin,
    initialHr,
    step,
    autoStart})

return <div role="group" aria-label="Count Down Timer">
    <button onClick={startBtnHandler} aria-label="" disabled={timerRef.current!==null}>Start</button>
    <button onClick={pauseBtnHandler} disabled={timerRef.current===null||paused}>Pause</button>
    <button onClick={resumeBtnHandler} disabled={!paused||timerState.counter===0}>Resume</button>
    <button onClick={resetHandler}>Reset</button>
    <TimerFormat type={format} counter={timerState.counter} minCounter={timerState.minCounter} hrCounter={timerState.hrCounter}/>
    </div>


}