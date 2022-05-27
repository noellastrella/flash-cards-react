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
            <div id="select-card-container">
                <div>Card Selector</div>
                <select>
                    
                </select>
            </div>
        </section>
    );
}




export default SaveLoadWidget