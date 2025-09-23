import { forwardRef, useRef, useState } from "react";
export default forwardRef(function TextInput({defaultValue='',value,onChange,validate,onSubmit},ref){

const internalRef=useRef(null);
const inputRef=ref||internalRef
const isControlled=value!==undefined;
const [error,setError]=useState("")

return <div>
 <input
 aria-label="Text input box"
 type="text"
 name="text"
 onChange={onChange} 

 {...(isControlled?{value,onChange}:{defaultValue,onChange})}
 onFocus={()=>{
    if(error?.length>0)setError("");
 }}
 ref={inputRef} value={value} onBlur={()=>{
  setError(validate(value))
 }}/>
 <button onClick={()=>onSubmit?.(isControlled?value:inputRef.current.value)}>Submit</button>
{error&& <p>{error}</p>}
</div>

})