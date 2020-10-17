  
import Question from './Question.js'
import PrintQuestion from './PrintQuestion.js'
import NotFoundQuestion from './NotFoundQuestion.js' 

[...document.getElementsByClassName('form-control')].forEach(selected => {
    selected.addEventListener('change', () => getQuestions())
})

function getQuestions() {
    const questionQuantity = document.getElementById('questions-number').value;
    const questionCategory = document.getElementById('questions-category').value;
    const questionDifficulty = document.getElementById('questions-difficulty').value;
    const questionType = document.getElementById('questions-type').value;
    
    let link = `https://opentdb.com/api.php?amount=${questionQuantity}`;
        if(questionCategory != 'any') { 
            link += `&category=${questionCategory}` 
        };
        if(questionDifficulty != 'any') 
        { 
            link += `&difficulty=${questionDifficulty}` 
        };
        if(questionType != 'any') 
        { 
            link += `&type=${questionType}` 
        };


        const container = document.getElementsByClassName('container')[0];
        container.innerHTML = '';

        let arrayCorrectAnswers = [];
        let tryAndId = [0,0];

    fetch(link)
        .then(response => response.json())
        // .then(data => { data.results.length ?
        //                     printCards(data.results)
        //                     :
        //                     NoQuestions()
        
        // })
        .then( data => {
            if (data.results.length != 0) {
                data.results.forEach( dataQuestion => {
                    const question = new Question(dataQuestion);
                    const printQuestions = new PrintQuestion();
                    printQuestions.printCard(question, arrayCorrectAnswers, tryAndId, questionQuantity);
                })
            } else {
                const noQuestions = new NotFoundQuestion(container)
                noQuestions.printMessafeNotFoundQuestion();
            }

        })
}



// let numberQuestion = 0;
// let id = 0; 
// let arrayCorrectAnswer = [];
// let intento = 0;


//     function NoQuestions() {
//         const container = document.getElementsByClassName('container')[0];
//         container.innerHTML = `<div class="card">
//                                     <div class="card-body">
//                                         "No se encontraron preguntas con las caracteriticas mencionadas"
//                                     </div>
//                                 </div>`
//     }


//     function printCards(questions) {
//         numberQuestion = 0;
//         id = 0;
//         arrayCorrectAnswer = [];
//         intento = 0;

//         const container = document.getElementsByClassName('container')[0];
//         container.innerHTML = '';

//         questions.forEach(question => {
//             const card = returnCardHTML(question);
//             container.innerHTML += card;
//         })

//         const submitButton = addSubmitButton();
//         container.innerHTML += submitButton;
//         addDefaultAction();
//     }

//     function returnCardHTML(q) {
//         let answers = [];
//         arrayCorrectAnswer.push(q.correct_answer);
//         answers.push(...q.incorrect_answers);

//         const numRandom = Math.floor(Math.random()*4);
//         answers.splice(numRandom, 0, q.correct_answer);

//         const card = `<div class="card">
//                         <div class="card-body">
//                             <h5 class="card-title">${q.category}</h5>
//                             <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
//                             ${returnAnswersHTML(answers)}
//                         </div>
//                     </div>`
//       return card;
//     }

//     function returnAnswersHTML (answers) {
//         numberQuestion++;
//         let answerHTML = '';

//         answers.forEach (answer => {
//             answerHTML += `<div class="form-check">
//                                 <input class="form-check-input" type="radio" name="question${numberQuestion}" id="answer${1 + id + answers.indexOf(answer)}" value=${1 + id + answers.indexOf(answer)}>
//                                 <label class="form-check-label" for="answer${1 + id + answers.indexOf(answer)}" >
//                                 ${answer}
//                                 </label>
//                             </div>`
//         })

//         id += answers.length;
//         return answerHTML;

//     }

//     // function returnAnswersHTML (corrects, incorrects) {
        
//     //     const correctHTML = `<div class="form-check">
//     //                             <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
//     //                             <label class="form-check-label" for="exampleRadios1">
//     //                             ${corrects}
//     //                             </label>
//     //                         </div>`
        
        
//     //     let incorrectHTML = ''
//     //     incorrects.forEach((incorrect) => {
//     //         incorrectHTML += `<div class="form-check">
//     //                         <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
//     //                         <label class="form-check-label" for="exampleRadios1">
//     //                         ${incorrect}
//     //                         </label>
//     //                     </div>`
//     //     })
//     //     return correctHTML + incorrectHTML;
//     // }
//     // 

//     function addSubmitButton() {

//         const button = `<input id="envio" type="submit" value="Submit"/>`;
//         return button;
//     }

//     function addDefaultAction() {
//         document.getElementById("envio").addEventListener("click", function(event) {
//             event.preventDefault();
//             subbmitAnswers();
//         });
//     }

//     function subbmitAnswers() {
//         let counter = 0;
//         let numberQuestion = 0;
        
//         arrayCorrectAnswer.forEach ( correctAnswer => {
//             numberQuestion++;
//             let correct = correctAnswer;
//             let answerChecked = document.querySelector(`input[name="question${numberQuestion}"]:checked`);
            
//             if(answerChecked == null ) {
//                 alert ("Responde las preguntas");
//             }
            
//             let labelAnswerChecked = answerChecked.labels[0].innerHTML;
//             console.log(labelAnswerChecked);
//             console.log(correct);

//             if(labelAnswerChecked.trim() == correct) {
//                 counter++;
//                 console.log("correcto");
//             }
//         })
//         showResults(counter);
//     }

//     function showResults (corrects) {
//         const container = document.getElementsByClassName('container')[0];
//         let textCorrects = '';
//         intento++;
//         corrects == 1 ? textCorrects = "correcta" : textCorrects = "correctas"
//         const results = `<div class="card">
//                         <div class="card-body">
//                             <h2>Intento ${intento} </h2>
//                             "Tienes ${corrects} respuestas ${textCorrects}"                
//                         </div>
//                     </div>
//                         `
//         container.innerHTML += results
        
//         addDefaultAction()
//     }