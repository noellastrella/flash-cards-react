import React, { useState } from "react";
import {Template, cardsToAdd}  from './js/init';
import FlashCards from './components/flashcards';
import SaveLoadWidget from './components/save-load-widget';

import './css/App.css';
import './css/flashCard.css';

function App() {
  
  const [cards, modifyCards] = React.useState([]);
  const [cardsUnfiltered, modifyUnfilteredCards] = React.useState([]);

  const [fileName, setFileName] = React.useState('');
  const [keyPressed, setKeyPressed] = useState(false);
  const [currCard, setCurrCard] = React.useState(0);

  // ------------------ KEY PRESS HANDLER

  const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);
  
    React.useEffect(() => {
      const downHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      };
  
      const upHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(false);
        }
      };
  
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
  
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    }, [targetKey]);
  
    return keyPressed;
  };

  const arrowUpPressed = useKeyPress("ArrowLeft");
  const arrowDownPressed = useKeyPress("ArrowRight");

  React.useEffect(() => {
    if (arrowUpPressed) {
      changeIndex("prev")
    }
  }, [arrowUpPressed]);

  React.useEffect(() => {
    if (arrowDownPressed) {
      changeIndex("next")
    }
  }, [arrowDownPressed]);

  // ------------------

  React.useEffect(()=>{ 
    let localStorageCards = localStorage.getItem('flashCards');
    
    if(localStorageCards){
      modifyCards(JSON.parse(localStorageCards));
      
    }else{
      loadCards(cardsToAdd);
    }
    
  },[]) // load CARDS

  // ------------------ CHANGE INDEX

    const changeIndex=(e)=>{
      let temp = currCard;

      switch (e){
        case 'prev':
          temp = temp>0?temp-=1:temp;
          setCurrCard(temp);
          break;

        case 'next':
          temp = temp<cards.length-1? temp+=1:temp;
          setCurrCard(temp);
          break;
        default:
          break;
      }
    }

  // ------------------ RESET CARDS

    const resetCards = ()=>{
      if(window.confirm("Are you sure you want to reset cards?")){
        localStorage.clear();
        modifyCards(cards=>[]);
      }
    }  

  // ------------------ LOAD CARDS

  const loadCards = (newCards)=>{
    newCards.forEach(e=>{
      modifyCards(cards=>[...cards,e])
    })  
  }

  // ------------------ ADD CARD

  const addCard = ()=>{
    let cardType="flip";
    let index = -1;
    
    Template.cardTypes.forEach((e,i)=>{
      if(e.type===cardType) {
        index = i;
      }
    })

    modifyCards(cards=>[...cards,Template.cardTypes[index]])
    setCurrCard(cards.length);
    saveLocal();
  }
  
  // ------------------ EDIT CARD

  const editCard = (index, face, text)=>{
    let tempCards = JSON.parse(JSON.stringify(cards));

    if(face==="Front"){
      tempCards[index].front.text = text;
    }else{
      tempCards[index].back.text = text;
    }

    modifyCards(cards=>[]); //erase all cards
    loadCards(tempCards); //reload cards 
    saveLocal();
  }

  // ------------------ DELETE CARD

  const deleteCard = (index)=>{
    let tempCards = cards.filter((e,i)=>{
      console.log(i!==index)
      if(i===index) console.log("ERASE ME::",i,index);
      return i!==index;
    })

    modifyCards(cards=>[...tempCards]); //erase all cards
    setCurrCard(currCard-1)
  }

  // ------------------ SAVE FILE

  const saveFile = ()=>{
    saveLocal();

    let a = document.createElement("a");
        document.body.appendChild(a);

        let save_btn = document.querySelector("#save");
        let theFileName = fileName? fileName: "flashcards.cards"
        let txt = JSON.stringify(cards);
        
        let file = new Blob([txt], {type: "text/plain;charset=utf-8"});
        let url = window.URL.createObjectURL(file);
        
        a.href = url;
        
        a.download = theFileName;    
        a.click();
        window.URL.revokeObjectURL(url);
  }
  
    // ------------------ SAVE LOCAL

    const saveLocal = ()=>{
      localStorage.setItem('flashCards', JSON.stringify(cards));
      console.log("SAVE", typeof cards)
    }
    
  // ------------------ LOAD FILE

  const loadFile = (e)=>{
    let reader;
    reader = new FileReader();

    reader.onload = function(e2){
        loadData(e2);
    }

    function loadData(e2){
        let newCards= JSON.parse(e2.target.result)
        modifyCards(cards=>[...newCards])
      
        setFileName(e.target.files[0].name);
    }
    
    reader.readAsText(e.target.files[0]);
  }

  // ------------------ GET CARD DATA

  const getCardData = (index) =>{
    return cards[index];
  }

  // ------------------ 
  return (
    <div className="App">
      <header className=""></header>
      <main>
        <sup>Current Card {currCard}</sup>
      <i id="add-button" className="nav-buttons" onClick={addCard}>+ Add Card</i>
        <FlashCards cards={cards} editCard={editCard} deleteCard={deleteCard} getCardData={getCardData} currCard={currCard} />        
      </main>
      <div id="prev-button" className="nav-buttons" onClick={()=>changeIndex("prev")}>&lt;&nbsp;Previous</div>
      <div id="next-button" className="nav-buttons"  onClick={()=>changeIndex("next")}>Next&nbsp;&gt;</div>
      <footer>
        <SaveLoadWidget resetCardsCB={resetCards} saveLocalCB={saveLocal} saveCB={saveFile} loadCB={loadFile} fileName = {fileName} setFileName={setFileName} />

      </footer>
    </div>
  );
}

export default App;