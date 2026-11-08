import React, {useContext, useEffect, useState} from "react";
import FlashCard from './flashcard.jsx';
import { AppContext } from '../App.jsx';

function FlashCards(props){
    const context = useContext(AppContext)
    
    let cards = context.cards;
    
    return(
        <ul id="flashCardContainer" >
            {
                cards.map((e,i)=>{
                    return (
                        <FlashCard key={"card-"+i} index={i} />
                    )
                })
            }
        </ul>
    );
}

export default FlashCards