import React, { useState } from "react";
import ContentEditable from 'react-contenteditable'

function FlashCard(props){
    let flipped = "";

    const [cardStyle, setCardStyle] = useState("cont");
    const [theStyle, setTheStyle] = useState({});
    let currCard = props.currCard;

    //const styleFolded = {transform: `translateX(${getRandom(1000)-820}px) translateZ(${getRandom(325)}px) translateY(${getRandom(50)+400}px) rotate3d(${getRandom(100)+1800}, ${getRandom(1000)-500}, ${getRandom(-20)-200}, ${getRandom(10)+0}deg)`};
    const styleFolded = {transform: `translateX(${-10+getRandom(-10)+10}px)  translateZ(${100*props.index}px) translateY(${400+(props.index*5)}px) rotate3d(${getRandom(100)+1800}, ${getRandom(1000)-500}, ${getRandom(-20)-200}, ${getRandom(20)+0}deg)`};
    
    React.useEffect(() => {
        console.log("index:",props.index, currCard)
        
        if(props.index === currCard){
            setTheStyle({transform:`none`});
        }else{
            setTheStyle(styleFolded);
        }

    }, [currCard]);

    const flipCard = (e) => {
        flipped = flipped == "" ? "flipped":"";
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

    let cardFront = props.getCardData(props.index).front.text;
    let cardBack = props.getCardData(props.index).back.text;

    function getRandom (num){
        return (Math.random()*num)+1;
    }

    return(
        <li style={theStyle} alt={`curr:${currCard} i:${props.index}`}>
            <section className={`flashCard ${cardStyle}`} >
                <div className="cardFront">
                    <ContentEditable html={cardFront} onChange={handleChangeFrontFace} />
                </div>
                <div className="cardBack">
                    <ContentEditable html={cardBack} onChange={handleChangeBackFace} />
                </div>
                <div>
                    <sup>{props.index}</sup>
                </div>
            </section>
            <img src="/images/flip.svg" className="icons flip-card-icon" onClick={flipCard}/>
            <img src="/images/trash.svg" className="icons trash-icon" onClick={deleteCard}/>
        </li>

    );
}

export default FlashCard;