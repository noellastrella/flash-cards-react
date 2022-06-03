import React, { useContext } from "react";
import { AppContext } from '../App.js';

function SaveLoadWidget(props){

    const context = useContext(AppContext);

    //const handleChange=(e)=>{
    //    context.setFileName(e);
    //}

    
    return(
        <section >
            <div id="save-load-container">
                {/* <input type="text" placeholder="filename.cards" value={props.fileName} onChange={e=>handleChange(e.target.value)}/> */}
                <label for="file">Save</label>
                <button id="save-button" onClick={context.saveLocal}>SAVE</button>
                <button id="save-button" onClick={context.saveFile}>DOWNLOAD SAVE FILE</button>

                <label for="file">Load File: </label>
                <input type="file" id="load-button" onChange={context.loadFile} value="" />
                
                <button id="save-button" onClick={context.resetCards}>RESET CARDS</button>

            </div>

        </section>
    );
}




export default SaveLoadWidget