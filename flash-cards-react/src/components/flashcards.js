import React from "react";
import FlashCard from './flashcard';
import { EditText, EditTextarea } from 'react-edit-text';


function FlashCards(props){
   
    let cards = props.cards;

    return(
        <ul id="flashCardContainer" >
            {
                cards.map((e,i)=>{
                    return (
                        <FlashCard key={"card-"+i} textFront={e.front.text} textBack={e.back.text}/>
                    )
                })
            }
        </ul>
    );
}


export default FlashCards