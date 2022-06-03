import React, { useState, useContext } from "react";
import ContentEditable from 'react-contenteditable'
import { AppContext } from '../App.js';

const FlashCard = (props)=> {
    let flipped = "";
    const context = useContext(AppContext);
    let currCard = context.currCard;

    const defaultCardPosition = {transform: `translateY(${80}px)`}
    const [cardStyle, setCardStyle] = useState("cont");
    const [theStyle, setTheStyle] = useState(defaultCardPosition);

    const styleFolded = {transform: `translateX(${-10+getRandom(-10)+10}px)  translateZ(${30*props.index}px) translateY(${700+(props.index*5)}px) rotate3d(${getRandom(100)+1800}, ${getRandom(1000)-500}, ${getRandom(-20)-200}, ${getRandom(20)+0}deg)`};
    //const [styleFolded, setStyleFolded] = useState(defaultCardPosition);
    const [nudgeRightClass, setNudgeRightClass] = useState("");

    let favoriteIcon = context.getCardData(props.index).favorite ? "./images/heart.svg":  "./images/heart-off.svg";
    let incorrectIcon = context.getCardData(props.index).correct =="no" ? "./images/wrong.svg":  "./images/wrong-off.svg";
    let correctIcon = context.getCardData(props.index).correct =="yes" ? "./images/right.svg":  "./images/right-off.svg";

    React.useEffect(() => {
        if(props.index === currCard){
            setTheStyle(defaultCardPosition);
        }else{
            setTheStyle(styleFolded);
        }

    }, [currCard]);

    const flipCard = (e) => {
        flipped = flipped === "flipped" ? "" : "flipped";
        setCardStyle(flipped);
    }

    const deleteCard=(e)=>{
        context.deleteCard(props.index)
    }

    const handleChangeBackFace = (e) => {
        context.editCard(props.index, "back", e.target.value)
    }

    const handleChangeFrontFace = (e) => {
        context.editCard(props.index, "front", e.target.value)
    }

    const handleFavorite = (e) =>{
        context.editCard(props.index, "favorite")
    }

    const handleCorrect = (e) =>{
        context.editCard(props.index, "correct")
    }

    const handleIncorrect = (e) =>{
        context.editCard(props.index, "incorrect")
    }

    const nudgeRight = (e) => {
        if(currCard !== props.index){
            nudgeRightClass ===""? setNudgeRightClass("nudgeRight") : setNudgeRightClass("")
        }
    }

    const makeProminent = () =>{
        if(currCard !== props.index) context.setCurrCard(props.index)
    }

    let cardFront = context.getCardData(props.index).front.text;
    let cardBack = context.getCardData(props.index).back.text;

    function getRandom (num){
        return (Math.random()*num)+1;
    }

    return(
        <li style={theStyle} className={`${nudgeRightClass} `} alt={`curr:${currCard} i:${props.index}`} onClick={makeProminent}>
            <section className={`flashCard ${cardStyle}`} >
                <div className="cardFront">
                    <ContentEditable html={cardFront} onChange={handleChangeFrontFace} />
                    <img src={favoriteIcon} className="icons favorite-icon" onClick={handleFavorite}/>
                </div>
                <div className="cardBack">
                    <ContentEditable html={cardBack} onChange={handleChangeBackFace} />
                    <img src={correctIcon} className="icons correct-icon" onClick={handleCorrect}/>
                    <img src={incorrectIcon} className="icons incorrect-icon" onClick={handleIncorrect}/>
                </div>
                <div>
                    <sup>{props.index}</sup>
                </div>
            </section>
            <img src="./images/flip.svg" className="icons flip-card-icon" onClick={flipCard}/>
            <img src="./images/trash.svg" className="icons trash-icon" onClick={deleteCard}/>
            
        </li>
    );
}

export default FlashCard;