import React, { useState } from "react";
import ContentEditable from 'react-contenteditable'

function FlashCard(props){
    let flipped = "";

    const [cardStyle, setCardStyle] = useState("cont");
    const [theStyle, setTheStyle] = useState({});
    
    //const styleFolded = {transform: `translateX(${getRandom(1000)-820}px) translateZ(${getRandom(325)}px) translateY(${getRandom(50)+400}px) rotate3d(${getRandom(100)+1800}, ${getRandom(1000)-500}, ${getRandom(-20)-200}, ${getRandom(10)+0}deg)`};
    const styleFolded = {transform: `translateZ(${100*props.index}px) translateY(${400+(props.index*5)}px) rotate3d(${getRandom(100)+1800}, ${getRandom(1000)-500}, ${getRandom(-20)-200}, ${getRandom(10)+0}deg)`};
    
    React.useEffect(() => {
        console.log("index:",props.index, props.currCard)
        
        if(props.index===props.currCard){
            setTheStyle({transform:`none`});
        }else{
            setTheStyle(styleFolded);
        }
    }, [props.currCard]);

    React.useEffect(() => {
        setTheStyle(styleFolded);
    }, []);

    const flipCard = (e) => {
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

    function getRandom (num){
        return (Math.random()*num)+1;
    }
// `transform: translateX(${getRandom(125)}px) translateZ(${getRandom(125)}px) translateY(${getRandom(500)}px) rotate3d(${getRandom(900)}, ${getRandom(200)}, ${getRandom(-200)}, ${getRandom(90)}deg);`
    //`transform: translateX(125px) translateZ(-125px) translateY(510px) rotate3d(900, 114, -124, 89deg);`



    return(
        <li style={theStyle}>
            <section className={`flashCard ${cardStyle}`} >
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


