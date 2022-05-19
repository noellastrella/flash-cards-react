import React, { useState } from "react";



function SaveLoadWidget(props){

    let filename = "x";
    //mock data

    const saveData = (e)=>{
        props.saveCB()
    };

    const loadData = (e)=>{
        props.loadCB(e)
    };


    const handleChange=(e)=>{
        props.setFileName(e);
    }

    
    return(
        <section >
            <div id="save-load-container">
            <input type="text" placeholder="filename.cards" value={props.fileName} onChange={e=>handleChange(e.target.value)}/>
                <button id="save-button" onClick={saveData}>SAVE</button>
                
                <span> | Load Flash Cards </span><input type="file" id="load-button" onChange={loadData} value="" />
            </div>

        </section>
    );
}




export default SaveLoadWidget