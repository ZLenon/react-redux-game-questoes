const mockResult = {
  player: {
    name: 'a',
    gravatarEmail: 'a',
    score: 243,
    assertions: 4,
    responseAPI: {}
  },
  requisition: {
    responseAPI: {
      response_code: 0,
      results: [
        {
          category: 'Vehicles',
          type: 'multiple',
          difficulty: 'medium',
          question: 'What part of an automobile engine uses lobes to open and close intake and exhaust valves, and allows an air/fuel mixture into the engine?',
          correct_answer: 'Camshaft',
          incorrect_answers: [
            'Piston',
            'Drive shaft',
            'Crankshaft'
          ]
        },
        {
          category: 'Mythology',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Who was the King of Gods in Ancient Greek mythology?',
          correct_answer: 'Zeus',
          incorrect_answers: [
            'Apollo',
            'Hermes',
            'Poseidon'
          ]
        },
        {
          category: 'Entertainment: Video Games',
          type: 'multiple',
          difficulty: 'easy',
          question: 'How many differently shaped Tetris pieces are there?',
          correct_answer: '7',
          incorrect_answers: [
            '5',
            '6',
            '8'
          ]
        },
        {
          category: 'General Knowledge',
          type: 'multiple',
          difficulty: 'easy',
          question: 'What do the letters of the fast food chain KFC stand for?',
          correct_answer: 'Kentucky Fried Chicken',
          incorrect_answers: [
            'Kentucky Fresh Cheese',
            'Kibbled Freaky Cow',
            'Kiwi Food Cut'
          ]
        },
        {
          category: 'Entertainment: Video Games',
          type: 'multiple',
          difficulty: 'hard',
          question: 'How many sets of grandmaster witcher gear are in The Witcher 3&#039;s Blood and Wine DLC?',
          correct_answer: '5',
          incorrect_answers: [
            '3',
            '6',
            '4'
          ]
        }
      ]
    },
    responseCode: 0
  }
}

export default mockResult;