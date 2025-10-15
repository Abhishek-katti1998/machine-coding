import { useState } from "react";
export default function useCycle(...args) {
  const [value, setValue] = useState(args[0]);
  const setter = () => {
    debugger;
    let curIndex = args.findIndex((val)=>val===value);
    setValue(args[(curIndex + 1) % args.length]);
  };
//   console.log("values", value);
  return [ value,setter]
}