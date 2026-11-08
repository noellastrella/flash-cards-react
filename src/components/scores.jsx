import React, {useContext, useEffect, useState} from "react";
import { AppContext } from '../App.jsx';

function Scores(props){
    const context = useContext(AppContext)
    
    let cards = context.cards;
    let cards_total = cards.length;
    let cards_answered = 0;
    let correct = 0;
    let incorrect = 0;

    cards.forEach(e => {
        //console.log(e.correct);
        if(e.correct!="n/a"){
            cards_answered++;
        }
        if(e.correct=="yes"){
            correct++;
        }

        if(e.correct=="no"){
            incorrect++;
        }

    });

    let answered = cards_answered>0 ? Math.round((correct/cards_answered)*100) : 0;

    return(
        <ul id="scoresContainer" >
            <li><h3>Percent Completed</h3>{Math.round((cards_answered/cards_total)*100)}% Completed</li>
            <li><h3>Overall</h3>{Math.round((correct/cards_total)*100)}% Correct</li>

            <li>{correct} Correct out of {cards_total}</li>
            
            <li><h3>Anwered</h3>{answered}% Correct ({correct} out of {cards_answered})</li>

            <li><h3></h3><button onClick={context.resetScores}>Clear</button></li>
            
        </ul>
    );
}

export default Scores