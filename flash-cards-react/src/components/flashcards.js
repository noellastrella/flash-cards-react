import React from "react";
import FlashCard from './flashcard';



function FlashCards(props){
   
    let cards = props.cards;

    return(
        <ul id="flashCardContainer" >
            {
                cards.map((e,i)=>{
                    return (
                        <FlashCard key={"card-"+i} editCard={props.editCard} getCardData={props.getCardData} index={i} textFront={e.front.text} textBack={e.back.text}/>
                    )
                })
            }
        </ul>
    );
}


export default FlashCards