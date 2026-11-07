import React,{useContext,useEffect}from"react";
import{AppContext}from"../App.jsx";
import Checkbox from"./checkbox.jsx";

function ShowFavsOnly(props){

    const context = useContext(AppContext);
    const showFavsRef = React.createRef()

    useEffect((e)=>{
        context.setShowFavs(showFavsRef.current.checked)
    },[])

    const handleChange=()=>{
        context.setShowFavs(showFavsRef.current.checked)
        console.log("showFavsRef: ", showFavsRef.current.checked)
    }

    return(
        <>
            <div id="showFavsOnly">
                <input type="checkbox" id="showFavs" onChange={handleChange} ref={showFavsRef} />
                <label for="showFavs">Show Favs Only</label> 
            </div>
        </>
    )

}


export default ShowFavsOnly;