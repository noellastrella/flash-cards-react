import {Template, FlashCardData}  from './js/init';
import FlashCards from './components/flashcards';

import './css/App.css';
import './css/flashCard.css';

import SaveLoadWidget from './components/save-load-widget';


function App() {
  let json = "";

  let cards = [
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

  const editCard = (e)=>{
    console.log(e)
  }

  const passCardData = (e)=>{
    console.log(e)
  }


  return (
    <div className="App">
      <header className="">
      

      </header>
      <main>
        <FlashCards  cards={cards} editCard={editCard} passCardData={passCardData}/>        
      </main>
      <div><textarea value={JSON.stringify(cards)} readOnly /></div>
      <footer>
        <SaveLoadWidget />
      </footer>
    </div>
  );
}

export default App;
