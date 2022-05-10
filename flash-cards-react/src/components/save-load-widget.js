import React from 'react';



function SaveLoadWidget(props){
    

    //mock data


    const saveData = (e)=>{
        console.log(e, "save");
    };

    const loadData = (e)=>{
        console.log(e, "load");

    };


    
    return(
        <section >
            <div id="save-load-container">
                <div>SAVE LOAD WIDGET</div>
                <button id="save-button" onClick={saveData}>SAVE</button>
                <button id="load-button" onClick={loadData}>LOAD</button>
            </div>

        </section>
    );
}




export default SaveLoadWidget