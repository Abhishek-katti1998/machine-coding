import "./App.css";
import useCycle from "./hooks/Cycle/useCycle";
import useEffectRanOnce from "./hooks/Cycle/useEffectRanOnce";
import { useRef ,useState} from "react";
import usePrevious from "./hooks/Cycle/usePrevious";
import FlexPlayground from "./components/FlexPlayground";
import GridPlayground from "./components/GridPlayground";
function App() {



return<>


<FlexPlayground />
<GridPlayground />

</> 

}

export default App;
