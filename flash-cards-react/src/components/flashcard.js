import React, { useState } from "react";
import ContentEditable from 'react-contenteditable'

function FlashCard(props){
    let flipped = "";
    let currCard = props.currCard;

    const defaultCardPosition = {transform: `translateY(${80}px)`}
    const [cardStyle, setCardStyle] = useState("cont");
    const [theStyle, setTheStyle] = useState(defaultCardPosition);

    //const styleFolded = {transform: `translateX(${getRandom(10)-20}px) translateZ(${getRandom(325)}px) translateY(${getRandom(50)+400}px) rotate3d(${getRandom(100)+1800}, ${getRandom(1000)-500}, ${getRandom(-20)-200}, ${getRandom(10)+0}deg)`};
    const [styleFolded, setStyleFolded] = useState(defaultCardPosition);
    const [nudgeRightClass, setNudgeRightClass] = useState("");
    
    React.useEffect(() =>{
        setStyleFolded({transform: `translateX(${-10+getRandom(-10)+10}px)  translateZ(${100*props.index}px) translateY(${700+(props.index*5)}px) rotate3d(${getRandom(100)+1800}, ${getRandom(1000)-500}, ${getRandom(-20)-200}, ${getRandom(20)+0}deg)`})
    },[])

    React.useEffect(() => {
        console.log("index:",props.index, currCard)
        
        if(props.index === currCard){
            setTheStyle(defaultCardPosition);
        }else{
            setTheStyle(styleFolded);
        }

    }, [currCard]);

    const flipCard = (e) => {
        flipped = flipped === "flipped" ? "":"flipped";
        setCardStyle(flipped);
    }

    const deleteCard=(e)=>{
        props.deleteCard(props.index)
    }

    const handleChangeBackFace = (e) => {
        props.editCard(props.index, "Back", e.target.value)
    }

    const handleChangeFrontFace = (e) => {
        props.editCard(props.index, "Front", e.target.value)
    }

    const handleFavorite = (e) =>{

    }

    const handleCorrect = (e) =>{
        
    }

    const handleIncorrect = (e) =>{
        
    }

    const nudgeRight = (e) => {
        if(currCard !== props.index){
            nudgeRightClass ===""? setNudgeRightClass("nudgeRight") : setNudgeRightClass("")
        }
    }

    let cardFront = props.getCardData(props.index).front.text;
    let cardBack = props.getCardData(props.index).back.text;

    function getRandom (num){
        return (Math.random()*num)+1;
    }

    return(
        <li style={theStyle} className={`${nudgeRightClass} `} alt={`curr:${currCard} i:${props.index}`} onClick={nudgeRight}>
            <section className={`flashCard ${cardStyle}`} >
                <div className="cardFront">
                    <ContentEditable html={cardFront} onChange={handleChangeFrontFace} />
                </div>
                <div className="cardBack">
                    <ContentEditable html={cardBack} onChange={handleChangeBackFace} />
                    <img src="/images/right.svg" className="icons correct-icon" onClick={handleCorrect}/>
                    <img src="/images/wrong.svg" className="icons incorrect-icon" onClick={handleIncorrect}/>
                </div>
                <div>
                    <sup>{props.index}</sup>
                </div>
            </section>
            <img src="/images/flip.svg" className="icons flip-card-icon" onClick={flipCard}/>
            <img src="/images/trash.svg" className="icons trash-icon" onClick={deleteCard}/>
            <img src="/images/heart.svg" className="icons favorite-icon" onClick={handleFavorite}/>
        </li>
    );
}

export default FlashCard;