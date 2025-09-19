import useThrottle from "../hooks/Throttling/useLeading"
function ThrottleBtn(){

    const throttleFoo=useThrottle(1000,(param)=>{console.log(param)});


    return <button onClick={()=>{
        throttleFoo('Throttled')
    }}
    >Throttle Btn</button>
}
export default ThrottleBtn