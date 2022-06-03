import React from "react";
import FlashCard from './flashcard';

function FlashCards(props){
   
    let cards = props.cards;
    
    return(
        <ul id="flashCardContainer" >
            {
                cards.map((e,i)=>{
                    return (
                        <FlashCard key={"card-"+i} editCard={props.editCard} deleteCard={props.deleteCard} getCardData={props.getCardData} index={i} textFront={e.front.text} textBack={e.back.text}  currCard={props.currCard} setCurrCard={props.setCurrCard}/>
                    )
                })
            }
        </ul>
    );
}

export default FlashCards