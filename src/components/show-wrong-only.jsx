import React,{useContext,useEffect}from"react";
import{AppContext}from"../App.jsx";
import Checkbox from"./checkbox.jsx";

function ShowWrongOnly(props){

    const context = useContext(AppContext);
    const showWrongRef = React.createRef()

    useEffect((e)=>{
        context.setShowWrong(showWrongRef.current.checked)
    },[])

    const handleChange=()=>{
        context.setShowWrong(showWrongRef.current.checked)
        console.log("showWrongRef: ", showWrongRef.current.checked)
    }

    return(
        <>
            <div id="showWrongOnly">
                <input type="checkbox" id="showWrong" onChange={handleChange} ref={showWrongRef} />
                <label for="showWrong">Show Wrong Only</label> 
            </div>
        </>
    )

}


export default ShowWrongOnly;