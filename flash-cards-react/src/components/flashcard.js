import React, { useState } from "react";
import ContentEditable from 'react-contenteditable'

function FlashCard(props){
    let flipped = "";

    const [cardStyle, setCardStyle] = useState("cont");


    const flipCard = (e) =>{
        flipped = flipped == "" ? "flipped":"";
        setCardStyle(flipped);
    }


    const handleChangeBack = (e) => {
        props.editCard(props.index, "Back", e.target.value)
    }


    const handleChangeFront = (e) => {
        props.editCard(props.index, "Front", e.target.value)
    }

    let cardFront = props.getCardData(props.index).front.text;
    let cardBack = props.getCardData(props.index).back.text;

    console.log(props.getCardData(props.index))
    return(
        <li className={`flashCard ${cardStyle}`}  >
            <div className="cardFront">
                <img src="/images/flip.svg" class="flip-card" onClick={flipCard}/>
                <ContentEditable html={cardFront}  onChange={handleChangeFront} />
            </div>
            <div className="cardBack">
                <img src="/images/flip.svg" class="flip-card" onClick={flipCard}/>
                <ContentEditable html={cardBack}  onChange={handleChangeBack} />
            </div>
        </li>

    );
}




export default FlashCard;