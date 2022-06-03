export const Template = {
    score: 0,
    cardTypes : [
        {
            id: -1,
            type: "flip",
            title: "",
            front   :   {
                text:   "(CLICK TO EDIT ME)",
                media:  "" //URL : image or video
            },
            back    :   {
                text : "(CLICK TO EDIT ME TOO)"
            },
            style: "",
            defaultStyle:"",
            answer: "",
            status: "incomplete", // incomplete, correct, incorrect
            points: 1,
            correct: "n/a",
            favorite: false
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
                favorite: false
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