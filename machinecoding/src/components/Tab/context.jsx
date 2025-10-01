import { createContext, useState } from "react";
export const Tabcontext=createContext({})
export default function TabProvider({children,defaultValue}){
    
    const [value,setValue]=useState(defaultValue)
    return <Tabcontext.Provider value={{value,setValue}}>
            {children}
        </Tabcontext.Provider>
}