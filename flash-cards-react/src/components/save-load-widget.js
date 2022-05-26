import React, { useState } from "react";



function SaveLoadWidget(props){

    let filename = "x";
    //mock data


    const handleChange=(e)=>{
        
        console.log(e)
        props.setFileName(e);
    }

    
    return(
        <section >
            <div id="save-load-container">
                
                
                {/* <input type="text" placeholder="filename.cards" value={props.fileName} onChange={e=>handleChange(e.target.value)}/> */}
                <label for="file">Save</label>
                <button id="save-button" onClick={props.saveLocalCB}>SAVE</button>
                <button id="save-button" onClick={props.saveCB}>DOWNLOAD SAVE FILE</button>

                <label for="file">Load File: </label>
                <input type="file" id="load-button" onChange={props.loadCB} value="" />
                
                <button id="save-button" onClick={props.resetCardsCB}>RESET CARDS</button>

            </div>

        </section>
    );
}




export default SaveLoadWidget