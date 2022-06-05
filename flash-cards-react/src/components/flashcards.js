import React, {useContext, useEffect, useState} from "react";
import FlashCard from './flashcard';
import { AppContext } from '../App.js';

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