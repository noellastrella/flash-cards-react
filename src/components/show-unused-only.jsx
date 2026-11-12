import React,{useContext,useEffect}from"react";
import{AppContext}from"../App.jsx";
import Checkbox from"./checkbox.jsx";

function ShowUnusedOnly(props){

    const context = useContext(AppContext);
    const showUnusedRef = React.createRef()

    useEffect((e)=>{
        context.setShowUnused(showUnusedRef.current.checked)
    },[])

    const handleChange=()=>{
        context.setShowUnused(showUnusedRef.current.checked)
        console.log("showUnusedRef: ", showUnusedRef.current.checked)
    }

    return(
        <>
            <div id="showUnusedOnly">
                <input type="checkbox" id="showUnused" onChange={handleChange} ref={showUnusedRef} />
                <label for="showUnused">Show Unused Only</label> 
            </div>
        </>
    )

}


export default ShowUnusedOnly;