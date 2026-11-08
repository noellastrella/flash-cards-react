import React, { useState, useEffect } from "react";
import {Template, cardsToAdd}  from './js/init';
import FlashCards from './components/flashcards';
import ShowBackFront from "./components/show-back-front";
import ShowFavsOnly from "./components/show-favs-only";
import ShowWrongOnly from "./components/show-wrong-only";

import SaveLoadWidget from './components/save-load-widget';
import CardSelector from './components/card-selector';
import Scores from './components/scores';


import './css/App.scss';
import './css/flashCard.scss';

export const AppContext = React.createContext();

function App() {
  const [cards, modifyCards] = useState([]);
  const [filteredCardsArr, modifyFilteredCardsArray] = useState([]);
  
  //const [cardsBackUp, setCardsBackUp] = useState([])

  const [fileName, setFileName] = useState('');
//  const [keyPressed, setKeyPressed] = useState(false);
  const [currCard, setCurrCard] = useState(0);
  const [currFilteredCard, setCurrFilteredCard] = useState(0);
  

  const [showBack, setShowBack] = useState(false);

  const [showFavs, setShowFavs] = useState(false);

  const [showWrong, setShowWrong] = useState(false);

  // ------------------ START
  useEffect(() => {
    let tempCards = JSON.parse(JSON.stringify(cards));
    populateFiltered(tempCards);
  }, [showFavs, showWrong]); 

  useEffect(()=>{ 
    let localStorageCards = localStorage.getItem('flashCards');
    
    if(localStorageCards){
      modifyCards(JSON.parse(localStorageCards));
      populateFiltered(JSON.parse(localStorageCards))
      //setCardsBackUp(JSON.parse(localStorageCards));
    }else{
      loadCards(cardsToAdd);
      populateFiltered(cardsToAdd);
      
    }

  },[])
  
  // ------------------ populate filtered cards

    function populateFiltered(cardsToFilter){
      
      modifyFilteredCardsArray(cardsToFilter.filter((e,i)=>{
        e.index = i;
        return showFavs && e.favorite == true || showWrong && e.correct == "no";
      }));
    }


  // ------------------ KEY PRESS HANDLER

    const useKeyPress = (targetKey) => {
      const [keyPressed, setKeyPressed] = useState(false);
  
      useEffect(() => { 
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

      const leftHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(true);
        }
      };
  
      const rightHandler = ({ key }) => {
        if (key === targetKey) {
          setKeyPressed(false);
        }
      };
  
      const metaHandler = ({ key }) => {
        console.log(key)
        if (key === targetKey) {
          setKeyPressed(false)
        }
      };

      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      window.addEventListener("keydown", metaHandler);

      //window.addEventListener("keyleft", rightHandler);
      //window.addEventListener("keyright", downHandler);
  
      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);

        window.removeEventListener("Meta", metaHandler);
        //window.removeEventListener("keyleft", leftHandler);
        //window.removeEventListener("keyright", rightHandler);
      };
    }, [targetKey]);
  
    return keyPressed;
  };

  const arrowUpPressed = useKeyPress("ArrowLeft");
  const arrowDownPressed = useKeyPress("ArrowRight");

  const arrowLeftPressed = useKeyPress("ArrowUp");
  const arrowRightPressed = useKeyPress("ArrowDown"); 

  const metaPressed = useKeyPress("Meta"); 

  useEffect(() => {
  if (arrowLeftPressed) {
    changeIndex("prev")
  }
  }, [arrowLeftPressed]);

  useEffect(() => {
  if (arrowRightPressed) {
    changeIndex("next")
  }
  }, [arrowRightPressed]);


  useEffect(() => {
    if (metaPressed) {
      changeIndex("random");
      
    }
    }, [metaPressed]);
  
  
  // ------------------ CHANGE INDEX

    const changeIndex=(e)=>{      
      let temp;

      temp = showFavs ? currFilteredCard : currCard;

      switch (e){
        case 'prev':          
          if(showFavs || showWrong){
              console.log(filteredCardsArr,currFilteredCard)  
            temp = currFilteredCard > 0 ? currFilteredCard-1 : 0;

          }else{
              temp = temp>0?temp-=1:temp;
          }
          break;
        case 'next':
          //temp = temp<cardsFiltered.length-1? temp+=1:temp;
          console.log(filteredCardsArr,currFilteredCard)  
          if(showFavs || showWrong){
              temp = currFilteredCard < filteredCardsArr.length- 1 ? currFilteredCard+1 : filteredCardsArr.length- 1 ;
          }else{
              temp = temp<cards.length-1? temp+=1:temp;
          } 
          break;
        case 'random':
          //temp = Math.floor(Math.random()*cardsFiltered.length);
          if(showFavs || showWrong){
            temp = Math.floor(Math.random()*filteredCardsArr.length);
          }else{
            temp = Math.floor(Math.random()*cards.length);
          }

            break
        case 'shuffle':
          console.log(cards)
          modifyCards(
            cards.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value))
          break;
        default:
          break;
      }
      if(showFavs){
        setCurrCard(filteredCardsArr[temp].index);
        setCurrFilteredCard(temp);
      }else{  
        setCurrCard(temp);
      }
    }
  
    // ------------------ RESET CARDS

  const resetScores = ()=>{
    if(window.confirm("Are you sure you want to reset scores?")){
      let tempCards = JSON.parse(JSON.stringify(cards));

      tempCards.forEach(e=>{
        e.correct = "n/a";
      });

      modifyCards(cards=>[]); //erase all cards
      loadCards(tempCards); //reload cards 
      //setCardsBackUp(tempCards);
      //saveLocal();
    }
  }  

  // ------------------ RESET CARDS

    const resetCards = ()=>{
      if(window.confirm("Are you sure you want to reset cards?")){
        localStorage.clear();
        modifyCards(cards=>[]);
        //setCardsBackUp(cards=>[]);
        addCard();
      }
    }  

  // ------------------ LOAD CARDS

  const loadCards = (newCards)=>{
    
    newCards.forEach(e=>{
      modifyCards(cards=>[...cards,e])
      //setCardsBackUp(cards=>[...cards,e])
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
    //setCardsBackUp(cards=>[...cards,Template.cardTypes[index]]);
    setCurrCard(cards.length);
    saveLocal();
  }
  
  // ------------------ EDIT CARD

  const editCard = (index, mode, data="")=>{
    let tempCards = JSON.parse(JSON.stringify(cards));

    if(mode==="front"){
      tempCards[index].front.text = data;
    }else if(mode==="back"){
      tempCards[index].back.text = data;
    }else if(mode==="favorite"){
      tempCards[index].favorite = !tempCards[index].favorite;
    }else if(mode==="incorrect"){
      tempCards[index].correct = tempCards[index].correct === "no" ? "n/a" : "no";
    }else if(mode==="correct"){
      tempCards[index].correct = tempCards[index].correct === "yes" ? "n/a" : "yes";
    }else{
      alert("Error editing cards")
    }

    populateFiltered(tempCards);

    console.log(cards)
    console.log(filteredCardsArr)

    modifyCards(cards=>[]); //erase all cards
    loadCards(tempCards); //reload cards 
    saveLocal();

  }

  // ------------------ DELETE CARD

  const deleteCard = (index)=>{
    let tempCards = cards.filter((e,i)=>{
      return i!==index;
    })

    modifyCards(cards=>[...tempCards]); //erase all cards
    //setCardsBackUp(cards=>[...tempCards]);
    setCurrCard(currCard-1)
  }

  // ------------------ SAVE FILE

  const saveFile = ()=>{
    saveLocal();

    let a = document.createElement("a");
        document.body.appendChild(a);

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
        modifyCards(cards=>[...newCards]);
        //setCardsBackUp(cards=>[...newCards]);
        setFileName(e.target.files[0].name);
    }
    
    reader.readAsText(e.target.files[0]);
  }

  // ------------------ GET CARD DATA

  const getCardData = (index) =>{
    return cards[index];
  }

  // -------------------
  return (
    <AppContext.Provider value={{cards:cards, editCard, deleteCard, currCard, setCurrCard, getCardData, changeIndex, resetCards, saveLocal, saveFile, loadFile, fileName, setFileName, resetScores, setShowBack, setShowFavs, showBack, setShowWrong, showWrong}}>
      <div className="App">
        <header className=""></header>
        <main>
          <Scores />
          { /*<Filters /> */ }
          <ShowBackFront />
          <ShowFavsOnly />
          <ShowWrongOnly />
          <sup>Current Card {currCard} of {cards.length-1}</sup>
        <i id="add-button" className="nav-buttons" onClick={addCard}>+<span> Add Card</span></i>
          <FlashCards  /> 
        </main>

        <div id="prev-button" className="nav-buttons" onClick={()=>changeIndex("prev")}>&lt;&nbsp;<span>Previous</span></div>
        <div id="shuffle-button" className="nav-buttons" onClick={()=>changeIndex("shuffle")}>Shuffle Cards</div>
        <div id="random-button" className="nav-buttons" onClick={()=>changeIndex("random")}>Random Card</div>
        <div id="next-button" className="nav-buttons"  onClick={()=>changeIndex("next")}><span>Next</span>&nbsp;&gt;</div>
        <footer>
          <SaveLoadWidget/>
          { /*<CardSelector  /> */ }
        </footer>
      </div>
    </AppContext.Provider>
  );
}

export default App;