import React, { useState } from "react";
import ContentEditable from 'react-contenteditable'

function FlashCard(props){
    let flipped = "";

    const [cardStyle, setCardStyle] = useState("cont");

    const flipCard = (e) =>{
        flipped = flipped == "" ? "flipped":"";
        setCardStyle(flipped);
    }

    const deleteCard=(e)=>{
        props.deleteCard(props.index)
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
        <li>
            <section className={`flashCard ${cardStyle}`}  >
                <div className="cardFront">
                    <ContentEditable html={cardFront}  onChange={handleChangeFront} />
                </div>
                <div className="cardBack">
                    <ContentEditable html={cardBack}  onChange={handleChangeBack} />
                </div>
            </section>
            <img src="/images/flip.svg" className="icons flip-card-icon" onClick={flipCard}/>
            <img src="/images/trash.svg" className="icons trash-icon" onClick={deleteCard}/>
        </li>

    );
}




export default FlashCard;


