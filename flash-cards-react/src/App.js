import React, { useState } from "react";
import {Template, FlashCardData}  from './js/init';
import FlashCards from './components/flashcards';

import './css/App.css';
import './css/flashCard.css';

import SaveLoadWidget from './components/save-load-widget';


function App() {
  let json = "";
  let cardsArray = [];

  const [cards, modifyCards] = React.useState(cardsArray);
  const [fileName, setFileName] = React.useState('');

  let cardsToAdd = [
    {
        id:-1,
        title: "Card 1",
        front:  {
          text: "card 1 front"
        },
        back:   {
          text:"card 1 back"
        },
        correct: "n/a" //yes, no, n/a
    },
    {
        id:-1,
        title: "Card 2",
        front:  {
          text: "card 2 front"
        },
        back:   {
          text:"card 2 back"
        },
        correct: "n/a" //yes, no, n/a
    },        
    {
        id:-1,
        title: "Card 3",
        front:  {
          text: "card 3 front"
        },
        back:   {
          text:"card 3 back"
        },
        correct: "n/a" //yes, no, n/a
    }
  ]

  React.useEffect(()=>{ loadCards(cardsToAdd) },[])
  
  const loadCards = (newCards)=>{
    newCards.forEach(e=>{
      modifyCards(cards=>[...cards,e])
    })  
  }

  const addCard = ()=>{
    let cardType="flip";
    let index = -1;
    Template.cardTypes.forEach((e,i)=>{
      //console.log(e.type. cardType)
      if(e.type==cardType) {
        index = i;
      }
    })
    
    modifyCards(cards=>[...cards,Template.cardTypes[index]])
  }

  const editCard = (index, face, text)=>{
    let tempCards = JSON.parse(JSON.stringify(cards));

    if(face=="Front"){
      tempCards[index].front.text = text;
    }else{
      tempCards[index].back.text = text;
    }

    modifyCards(cards=>[]); //erase all cards
    loadCards(tempCards); //reload cards    
  }

  const deleteCard = (index)=>{
    let tempCards = JSON.parse(JSON.stringify(cards));
    
    tempCards.filter((e,i)=>{
      return i!=index;
    })
  }

  const saveFile = ()=>{

    let a = document.createElement("a");
        document.body.appendChild(a);

        let save_btn = document.querySelector("#save");
        let theFileName = fileName? fileName: "flashcards.cards"
        let txt = JSON.stringify(cards);
        
        var file = new Blob([txt], {type: "text/plain;charset=utf-8"});
        var url = window.URL.createObjectURL(file);
        
        a.href = url;
        
        a.download = theFileName;    
        a.click();
        window.URL.revokeObjectURL(url);
  }

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

  const getCardData = (index) =>{
    return cards[index];
  }

  return (
    <div className="App">
      <header className=""></header>
      <main>
      <i id="addButton" onClick={addCard}>+</i>
        <FlashCards cards={cards} editCard={editCard} deleteCard={deleteCard} getCardData={getCardData} />        
      </main>
      <div><textarea value={JSON.stringify(cards)} readOnly /></div>
      <footer>
        <SaveLoadWidget saveCB={saveFile} loadCB={loadFile} fileName = {fileName} setFileName={setFileName} />
      </footer>
    </div>
  );
}

export default App;