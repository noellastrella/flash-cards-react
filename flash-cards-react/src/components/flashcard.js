import React, { useState } from "react";

function FlashCard(props){
    let flipped = "";

    const [cardStyle, setCardStyle] = useState("cont");

    const editCard = (e) =>{
        props.editCard(e)
    }

    const flipCard = (e) =>{
        flipped = flipped == "" ? "flipped":"";
        console.log(flipped)
        setCardStyle(flipped);
    }


    return(
        <li className={`flashCard ${cardStyle}`} onClick={flipCard} >
            <div className="cardFront">
                {props.textFront}
            </div>
            <div className="cardBack">
                {props.textBack}
            </div>
        </li>

    );
}




export default FlashCard;