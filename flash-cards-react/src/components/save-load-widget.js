import React, { useState } from "react";



function SaveLoadWidget(props){
    
    

    let filename = "x";
    //mock data


    const saveData = (e)=>{
        
        console.log(e, "save");
        props.saveCB()
    };

    const loadData = (e)=>{
        console.log(e, "load");
        props.loadCB(e)
    };


    const handleChange=(e)=>{
        
        console.log(e)
        props.setFileName(e);
    }

    
    return(
        <section >
            <div id="save-load-container">
                <div>SAVE LOAD WIDGET</div>
                <button id="save-button" onClick={saveData}>SAVE</button>
                <input type="text" placeholder="filename.cards" value={props.fileName} onChange={e=>handleChange(e.target.value)}/>
                <input type="file" id="load-button" onChange={loadData} value="" />
            </div>

        </section>
    );
}




export default SaveLoadWidget