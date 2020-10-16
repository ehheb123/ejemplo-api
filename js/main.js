import Question from './Question.js'
import PrintQuestion from './PrintQuestion.js'
import NotFoundQuestion from './NotFoundQuestion.js' 

[...document.getElementsByClassName('form-control')].forEach(selected => {
    selected.addEventListener('change', () => getQuestions())
})

function getQuestions() {
    /* MODIFICA LA URL DE ACUERDO A LAS CATEGORÍAS SELECCIONADAS */
    const questionQuantity = document.getElementById('questions-number').value;
    const questionCategory = document.getElementById('question-category').value;
    const questionDifficulty = document.getElementById('question-difficulty').value;
    const questionType = document.getElementById('question-type').value;  
    let url = `https://opentdb.com/api.php?amount=${questionQuantity}`
    if (questionCategory != 'any') url += `&category=${questionCategory}`
    if (questionDifficulty != 'any') url +=  `&difficulty=${questionDifficulty}`
    if (questionType != 'any') url += `&type=${questionType}`   

    /* LIMPIAR PREGUNTAS ANTERIORES */
    const container = document.getElementsByClassName('container')[0];
    container.innerHTML = '';

    /* INICIALIZACIÓN DE VARIABLES GLOBALES QUE SERVIRÁN PARA MANEJAR LA CANT DE PREGUNTAS, INTENTO, NUM. PREGUNTA Y EL ARRAY DE PREGUNTAS CORRECTAS */
    let arrayCorrectAnswers = []
    let tryAndId = [0,0]
    /* FETCH DE LA URL DINÁMICA */
    fetch(url)
        .then(response => response.json())
        /* EVALUAR SI LA API ESTÁ DEVOLVIENDO DATOS O NO */
        /*.then(data => { data.results.length ?
                            printCards(data.results)
                            :
                            NoQuestions()}
        )*/
        .then( data => {
            if (data.results.length != 0){
                data.results.forEach(dataQuestion => {
                    const question = new Question (dataQuestion)
                    const printQuestions = new PrintQuestion()
                    printQuestions.printCard(question, arrayCorrectAnswers, tryAndId, questionQuantity)
                })
            } else {
                const noQuestions = new NotFoundQuestion(container) 
                noQuestions.printMessageNotFoundQuestion()
            }
        })
}

// function   NoQuestions() {
//     const container = document.getElementsByClassName('container')[0];
//     container.innerHTML = `<div class="card">
//                                 <div class="card-body">
//                                     "No se encontraron preguntas con las caracteriticas mencionadas"
//                                 </div>
//                             </div>
//     `
// }

// function printCards(questions) {
//     const container = document.getElementsByClassName('container')[0];
//     container.innerHTML = '';

//     questions.forEach(question => {
//         const card = returnCardHTML(question);
//         container.innerHTML += card;
//     })
//     const submitButton  = addSubmitButton ()
//     container.innerHTML += submitButton
//     addDefaultAction() // prevent default and show results
// }

// function returnCardHTML(q) {
//     // crear un nuevo array con todas las preguntas     
//     let answers = []
//     arrayCorrectAnswers.push(q.correct_answer)  
//     answers.push (...q.incorrect_answers)
    
//     // mezclar respuestas para que la respuesta correcta no esté siempre en el mismo lugar
//     const numRandom = Math.floor (Math.random() * answers.length)
//     answers.splice(numRandom, 0, q.correct_answer);

//     const card = `<div class="card">
//                     <div class="card-body">
//                         <h5 class="card-title">${q.category}</h5>
//                         <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
//                         ${returnAnswersHTML(answers)}
//                     </div>
//                 </div>
//                     `
//     return card;

// }

// function returnAnswersHTML (answers) {
//     numberQuestion++
//     let answerHTML = ''
//     answers.forEach(answer => {
//         answerHTML += `<div class="form-check">
//                         <input class="form-check-input" type="radio" name="question${numberQuestion}" id="answer${1 + id + answers.indexOf(answer)}" value=${1 + id + answers.indexOf(answer)}>
//                         <label class="form-check-label" for="answer${1 + id + answers.indexOf(answer)}" >
//                         ${answer}
//                         </label>
//                     </div>`
//     })
//     id += answers.length
//     return answerHTML;
// }

// function addSubmitButton (){
//     const button = `<input id="envio" type="submit" value="Submit" />`
//     return button
// }

// function addDefaultAction () { 
//     document.getElementById("envio").addEventListener("click", function(event){
//         event.preventDefault()
//         subbmitAnswers()
//     });
// }


// function subbmitAnswers() {
//     let contador = 0
//     let numberQuestion = 0
//     arrayCorrectAnswers.forEach(correctAnswer => {
//         numberQuestion++
//         let correct = correctAnswer
//         let answerChecked = document.querySelector(`input[name="question${numberQuestion}"]:checked`)
//         if (answerChecked == null) {
//             alert("Responda todas las preguntas")
//         }
//         let labelAnswerChecked = answerChecked.labels[0].innerHTML
//         console.log(labelAnswerChecked)
//         console.log(correct)
//         if (labelAnswerChecked.trim() == correct){
//             contador++
//             console.log("correcto")
//         }
//     })
//     showResults(contador)
// }

// function showResults (corrects) {
//     const container = document.getElementsByClassName('container')[0];
//     let textCorrects = ''
//     intento++;
//     corrects == 1 ? textCorrects = "correcta" : textCorrects = "correctas"
//     const results = `<div class="card">
//                     <div class="card-body">
//                         <h2>Intento ${intento} </h2>
//                         "Tienes ${corrects} respuestas ${textCorrects}"                
//                     </div>
//                 </div>
//                     `
//     container.innerHTML += results
//     // arrayCorrectAnswers = []
//     addDefaultAction()
// }