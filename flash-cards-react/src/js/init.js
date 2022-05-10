

export const Template = {
    score: 0,
    card_types : [
        {
            type: "flip",
            title: "",
            front   :   {
                text:   "",
                media:  "" //URL : image or video
            },
            back    :   {
                text : ""
            },
            answer: "",
            status: "incomplete", // incomplete, correct, incorrect
            points: 1,
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
