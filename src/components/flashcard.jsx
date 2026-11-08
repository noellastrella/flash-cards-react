import React, { useState, useEffect, useContext } from "react";
import ContentEditable from 'react-contenteditable';
import { AppContext } from '../App.jsx';

const FlashCard = (props)=> {
    
    const context = useContext(AppContext);
    let currCard = context.currCard;

    const defaultCardPosition = {transform: `translateY(${80}px)`}
    const [cardStyle, setCardStyle] = useState("cont");
    const [theStyle, setTheStyle] = useState(defaultCardPosition);

    const [flipped, setFlipped] = useState(context.showBack);
    const styleFolded = {transform: `translateX(${-10+getRandom(-10)+10}px)  translateZ(${30*props.index}px) translateY(${600+(props.index*5)}px) rotate3d(${getRandom(100)+1800}, ${getRandom(1000)-500}, ${getRandom(-20)-200}, ${getRandom(20)-360}deg)`};

    let favoriteIcon = context.getCardData(props.index).favorite ? "./images/heart.svg":  "./images/heart-off.svg";
    let incorrectIcon = context.getCardData(props.index).correct ==="no" ? "./images/wrong.svg":  "./images/wrong-off.svg";
    let correctIcon = context.getCardData(props.index).correct ==="yes" ? "./images/right.svg":  "./images/right-off.svg";

    
    useEffect(() => {
        //console.log(props.index === currCard, props.index , currCard)
        if(props.index === currCard){
            setTheStyle(defaultCardPosition);
            flipCard();
        }else{
            setTheStyle(styleFolded);
            setFlipped(context.showBack)
            if(context.showBack) forceHideFlip();
        }
        
        
        console.log("showBack", context.showBack)
        
        //flipCard();
    }, [currCard, context.showBack]);

    useEffect(()=>{
        setFlipped(!context.showBack);
    },[])

    const flipCard = () => {
        setFlipped(!flipped);
        setCardStyle(flipped == true ? "flipped" : "");
        console.log("FLIPPED! showBack: ", flipped, context.showBack, props.index);
    }

    const forceHideFlip = () =>{
        setFlipped(true);
        setCardStyle("");
    }

    const deleteCard=(e)=>{
        if(window.confirm("Are you sure you want to delete this card?")){
            context.deleteCard(props.index)
        }
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

    const makeProminent = () =>{
        if(context.currCard !== props.index) context.setCurrCard(props.index)
    }

    let cardFront = context.getCardData(props.index).front.text;
    let cardBack = context.getCardData(props.index).back.text;

    function getRandom (num){
        return (Math.random()*num)+1;
    }

      // ------------------ KEY PRESS HANDLER

      const useKeyPress = (targetKey) => {
        useEffect(() => { 
        const downHandler = ({ key }) => {
            if(context.currCard == props.index){
                if (key === "Alt") {
                    console.log("FLIP!!!!")
                    flipCard();
                }
                console.log(key)
            }
        };
    
        window.addEventListener("keydown", downHandler);
        return () => {
          window.removeEventListener("keydown", downHandler);
        };
      }, [context.currCard]);    
    };
  
    useKeyPress();

    // =========================================
   
    return(
        <li style={theStyle} alt={`curr:${currCard} i:${props.index}`} onClick={makeProminent} >
            <section className={`flashCard ${cardStyle}`} >
            
                <div className="cardFront">
                    <sup>{props.index}</sup>        
                    <ContentEditable html={cardFront} onChange={handleChangeFrontFace} />
                    <img src={favoriteIcon} className="icons favorite-icon" onClick={handleFavorite} alt="favorite"/>
                </div>
                <div className="cardBack">
                    <ContentEditable html={cardBack} onChange={handleChangeBackFace} />
                </div>

            </section>
            <img src="./images/flip.svg" className="icons flip-card-icon" onClick={flipCard} alt="flip card"/>
            <img src="./images/trash.svg" className="icons trash-icon" onClick={deleteCard} alt="delete card"/>
            <img src={correctIcon} className="icons correct-icon" onClick={handleCorrect} alt="mark correct"/>
            <img src={incorrectIcon} className="icons incorrect-icon" onClick={handleIncorrect} alt="mark incorrect"/>
        </li>
    );
}

export default FlashCard;