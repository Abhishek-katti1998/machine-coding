import TabProvider,{Tabcontext} from "./context";
import { Children, createRef, useContext,forwardRef, cloneElement } from "react";
function Tab({ children }) {
    const { value: contextValue, setValue } = useContext(Tabcontext);
  
    const triggers = Children.toArray(children);
    const triggerRef = triggers.map(() => createRef());
  
    const onKeyDown = (key, index) => {
      const max = triggers.length;
  
      switch (key) {
        case "ArrowLeft": {
          const prev = (index - 1 + max) % max;
          triggerRef[prev].current.focus();
          break;
        }
        case "ArrowRight": {
          const next = (index + 1) % max;
          triggerRef[next].current.focus();
          break;
        }
        case "Home": {
          triggerRef[0].current.focus();
          break;
        }
        case "End": {
          triggerRef[max - 1].current.focus();
          break;
        }
        case "Enter":
        case " ": // spacebar
          setValue(triggers[index].props.value);
          break;
        default:
          break;
      }
    };
  
    return (
      <div role="tablist">
        {triggers.map((child, index) =>
          cloneElement(child, {
            onClick: () => setValue(child.props.value),
            onKeyDown: (e) => onKeyDown(e.key, index),
            ref: triggerRef[index],
            isActive: contextValue === child.props.value,
          })
        )}
      </div>
    );
  }
  
  const Trigger = forwardRef(({ children, onClick, onKeyDown, isActive }, ref) => {
    return (
      <button
        tabIndex={isActive ? 0 : -1}
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-label={children}
        style={{ backgroundColor: isActive ? "blue" : "wheat" }}
       
      >
        {children}
      </button>
    );
  });
  
function Content({value,children}){
  
    const {value:contextValue}=useContext(Tabcontext);
    return contextValue===value?<div role="tabpanel">{children}</div>:null;
}

export default function Tabs({defaultValue,children}){
    
return <TabProvider defaultValue={defaultValue}>
{children}
</TabProvider>


}



Tabs.Tab=Tab;
Tabs.Trigger=Trigger;
Tabs.Content=Content;