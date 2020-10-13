let numberQuestion = 0
let id = 0
let arrayCorrectAnswers = []
let intento = 0;
function getQuestions() {
    const questionQuantity = document.getElementById('questions-number').value;
    const questionCategory = document.getElementById('question-category').value;
    const questionDifficulty = document.getElementById('question-difficulty').value;
    const questionType = document.getElementById('question-type').value;
    
    let url = `https://opentdb.com/api.php?amount=${questionQuantity}`
    if (questionCategory != 'any') url += `&category=${questionCategory}`
    if (questionDifficulty != 'any') url +=  `&difficulty=${questionDifficulty}`
    if (questionType != 'any') url += `&type=${questionType}`
    
    fetch(url)
        .then(response => response.json())
        .then(data => { data.results.length ? 
                            printCards(data.results)
                            :
                            NoQuestions()}
        )

}

function NoQuestions() {
    const container = document.getElementsByClassName('container')[0];
    container.innerHTML = `<div class="card">
                                <div class="card-body">
                                    "No se encontraron preguntas con las caracteriticas mencionadas"
                                </div>
                            </div>
    `
}

function printCards(questions) {
    numberQuestion = 0
    id = 0
    arrayCorrectAnswers = []
    intento = 0
    const container = document.getElementsByClassName('container')[0];
    container.innerHTML = '';

    questions.forEach(question => {
        const card = returnCardHTML(question);
        container.innerHTML += card;
    })
    const submitButton  = addSubmitButton ()
    container.innerHTML += submitButton
    addDefaultAction() // prevent default and show results
}

function returnCardHTML(q) {
    // crear un nuevo array con todas las preguntas     
    let answers = []
    arrayCorrectAnswers.push(q.correct_answer)  
    answers.push (...q.incorrect_answers)
    
    // mezclar respuestas para que la respuesta correcta no esté siempre en el mismo lugar
    const numRandom = Math.floor (Math.random() * 4)
    answers.splice(numRandom, 0, q.correct_answer);

    const card = `<div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${q.category}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${returnAnswersHTML(answers)}
                    </div>
                </div>
                    `
    return card;

}

function returnAnswersHTML (answers) {
    numberQuestion++
    let answerHTML = ''
    answers.forEach(answer => {
        answerHTML += `<div class="form-check">
                        <input class="form-check-input" type="radio" name="question${numberQuestion}" id="answer${1 + id + answers.indexOf(answer)}" value=${1 + id + answers.indexOf(answer)}>
                        <label class="form-check-label" for="answer${1 + id + answers.indexOf(answer)}" >
                        ${answer}
                        </label>
                    </div>`
    })
    id += answers.length
    return answerHTML;
}

function addSubmitButton (){
    const button = `<input id="envio" type="submit" value="Submit" />`
    return button
}

function addDefaultAction () { 
    document.getElementById("envio").addEventListener("click", function(event){
        event.preventDefault()
        subbmitAnswers()
    });
}


function subbmitAnswers() {
    let contador = 0
    let numberQuestion = 0
    arrayCorrectAnswers.forEach(correctAnswer => {
        numberQuestion++
        let correct = correctAnswer
        let answerChecked = document.querySelector(`input[name="question${numberQuestion}"]:checked`)
        if (answerChecked == null) {
            alert("Responda todas las preguntas")
        }
        let labelAnswerChecked = answerChecked.labels[0].innerHTML
        console.log(labelAnswerChecked)
        console.log(correct)
        if (labelAnswerChecked.trim() == correct){
            
            contador++
            console.log("correcto")
        }
    })
    showResults(contador)
}

function showResults (corrects) {
    const container = document.getElementsByClassName('container')[0];
    let textCorrects = ''
    intento++;
    corrects == 1 ? textCorrects = "correcta" : textCorrects = "correctas"
    const results = `<div class="card">
                    <div class="card-body">
                        <h2>Intento ${intento} </h2>
                        "Tienes ${corrects} respuestas ${textCorrects}"                
                    </div>
                </div>
                    `
    container.innerHTML += results
    // arrayCorrectAnswers = []
    addDefaultAction()
}