export const Template = {
    score: 0,
    cardTypes : [
        {
            id: -1,
            type: "flip",
            title: "",
            front   :   {
                text:   "NEW CARD FRONT",
                media:  "" //URL : image or video
            },
            back    :   {
                text : "NEW CARD BACK"
            },
            style: "",
            defaultStyle:"",
            answer: "",
            status: "incomplete", // incomplete, correct, incorrect
            points: 1,
            correct: "n/a"
        },
        {
            type: "multiple choice",
            title: "",
            front   :   {
                text:   "",
                media:  "" //URL
            },
            back    : {
                text: "",
                options : 
                    [   
                        {
                            text: "",
                            correct: false,
                        }
                    ],
                answer: "",
                status: "incomplete", // incomplete, correct, incorrect
                points: 1,
            }
                
        },
    ]
}

export let FlashCardData = {
    cards: []
}


  // ------------------ INIT CARDS TO ADD

export const cardsToAdd = [
    /*
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
  //*/
    ]