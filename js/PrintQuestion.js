import PrintButton from './PrintButton.js'

export default class PrintQuestion {

  printCard(question, arrayCorrectAnswers, tryAndId, questionQuantity) {
    const container = document.getElementsByClassName('container')[0];
    const card = this.returnCardHTML(question.dataQuestion, arrayCorrectAnswers, tryAndId);
    container.innerHTML += card;

    const submitButton  = new PrintButton (container)
    if (arrayCorrectAnswers.length == questionQuantity){
      submitButton.addSubmitButton (submitButton)
      submitButton.addDefaultAction(arrayCorrectAnswers, tryAndId) // prevent default and show results
    }
  }

  returnCardHTML(q, arrayCorrectAnswers, tryAndId) {
    // crear un nuevo array con todas las preguntas
    let answers = []
    arrayCorrectAnswers.push(q.correct_answer)
    answers.push (...q.incorrect_answers)
    
    // mezclar respuestas para que la respuesta correcta no esté siempre en el mismo lugar
    const numRandom = Math.floor (Math.random() * answers.length)
    answers.splice(numRandom, 0, q.correct_answer);

    const card = `<div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${q.category}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${this.returnAnswersHTML(answers, arrayCorrectAnswers, tryAndId)}
                    </div>
                </div>
                    `
    return card;
  }
  

  returnAnswersHTML (answers, arrayCorrectAnswers, tryAndId) {
    let answerHTML = ''
    answers.forEach(answer => {
        answerHTML += `<div class="form-check">
                        <input class="form-check-input" type="radio" name="question${arrayCorrectAnswers.length}" id="answer${1+tryAndId[0]+answers.indexOf(answer)}" value=${1+tryAndId[0]+answers.indexOf(answer)}>
                        <label class="form-check-label" for="answer${1+tryAndId[0]+answers.indexOf(answer)}" >
                        ${answer}
                        </label>
                    </div>`
    })
    tryAndId[0] += answers.length
    return answerHTML;
  }
}