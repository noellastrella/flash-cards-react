import React, { useState, useEffect } from "react";
import {Template, cardsToAdd}  from './js/init';
import FlashCards from './components/flashcards';
import ShowBackFront from "./components/show-back-front";
import SaveLoadWidget from './components/save-load-widget';
import CardSelector from './components/card-selector';
import Scores from './components/scores';
import Filters from './components/filters';

import './css/App.scss';
import './css/flashCard.scss';

export const AppContext = React.createContext();

function App() {
  const [cards, modifyCards] = useState([]);
  const [cardsBackUp, setCardsBackUp] = useState([])

  const [fileName, setFileName] = useState('');
//  const [keyPressed, setKeyPressed] = useState(false);
  const [currCard, setCurrCard] = useState(0);
  const [filters, setFilters] = useState({});
  const [showBack, setShowBack] = useState(false)



  //console.log("RENDERING APP")
  // ------------------ START

  useEffect(()=>{ 
    let localStorageCards = localStorage.getItem('flashCards');
    
    if(localStorageCards){
      modifyCards(JSON.parse(localStorageCards));
      setCardsBackUp(JSON.parse(localStorageCards));
    }else{
      loadCards(cardsToAdd);
    }

    setFilters({
      unlabeled : true,
      incorrect : true,
      correct   : true,
      favorite  : true 
    })
  },[]) // load CARDS
  
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
  

  // ------------------ FILTERS

  const filterCards = ()=>{
    console.log("running...");

    let temp = cardsBackUp.filter((e)=>{
        console.log(e);
        let pass = false;
        
        if(filters.favorite)
        
        if(e.favorite && filters.favorite){
            pass=true;
        }

        if(e.correct=="no" && filters.incorrect) pass=true;
        
        if(e.correct=="yes" && filters.correct) pass=true;
        
        if(!e.favorite && e.correct=="n/a" && filters.unlabeled) pass=true;
        setCurrCard(0)
        //console.log(">>",filters, `Fav Filter: ${filters.favorite} | obj fav: ${e.favorite} | correct:  ${e.correct}`, "PASS:", pass)
        return pass;
    })

    console.log("XXXX", temp, cardsBackUp);
    modifyCards(cards=>[])
    temp.forEach(e=>{
      modifyCards(temp=>[...temp,e])
    })  
}
  
  // ------------------ CHANGE INDEX

    const changeIndex=(e)=>{
      let temp = currCard;

      switch (e){
        case 'prev':
          temp = temp>0?temp-=1:temp;
          break;
        case 'next':
          //temp = temp<cardsFiltered.length-1? temp+=1:temp;
          temp = temp<cards.length-1? temp+=1:temp;
          break;
        case 'random':
          //temp = Math.floor(Math.random()*cardsFiltered.length);
          temp = Math.floor(Math.random()*cards.length);
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

      setCurrCard(temp);
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
      setCardsBackUp(tempCards);
      //saveLocal();
    }
  }  



  // ------------------ RESET CARDS

    const resetCards = ()=>{
      if(window.confirm("Are you sure you want to reset cards?")){
        localStorage.clear();
        modifyCards(cards=>[]);
        setCardsBackUp(cards=>[]);
        addCard();
      }
    }  

  // ------------------ LOAD CARDS

  const loadCards = (newCards)=>{
    
    newCards.forEach(e=>{
      modifyCards(cards=>[...cards,e])
      setCardsBackUp(cards=>[...cards,e])
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
    setCardsBackUp(cards=>[...cards,Template.cardTypes[index]]);
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
    setCardsBackUp(cards=>[...tempCards]);
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
        setCardsBackUp(cards=>[...newCards]);
        setFileName(e.target.files[0].name);
    }
    
    reader.readAsText(e.target.files[0]);
  }

  // ------------------ GET CARD DATA

  const getCardData = (index) =>{
    return cards[index];
  }

  // ------------------ 



  // -------------------
  return (
    <AppContext.Provider value={{cards:cards, editCard, deleteCard, currCard, setCurrCard, getCardData, changeIndex, resetCards, saveLocal, saveFile, loadFile, fileName, setFileName, setFilters, filterCards, filters, resetScores, setShowBack, showBack}}>
      <div className="App">
        <header className=""></header>
        <main>
          <Scores />
          { /*<Filters /> */ }
          <ShowBackFront />
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