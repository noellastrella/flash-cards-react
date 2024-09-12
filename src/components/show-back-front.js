import React, {useContext, useEffect} from "react";
import { AppContext } from '../App.js';
import Checkbox from "./checkbox.js";

function ShowBackFront(props){

    const context = useContext(AppContext);
    const showBackRef = React.createRef()

    useEffect((e)=>{
        context.setShowBack(showBackRef.current.checked)
    },[])

    const handleChange=()=>{
        context.setShowBack(showBackRef.current.checked)
        console.log("showBackRef: ", showBackRef.current.checked)
    }

    return(
        <>
        <div id="showBackFront">
            <input type="checkbox" id="showBack" onChange={handleChange} ref={showBackRef} />
            <label for="showBack">Show Back</label> 
        </div>
        </>
    )
}

export default ShowBackFront;