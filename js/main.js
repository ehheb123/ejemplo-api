




function getQuestions() {
    const questionQuantity = document.getElementById('questions-number').value;
    const questionCategory = document.getElementById('question-category').value;
    const questionType = document.getElementById('question-type').value;
    const questionDifficulty = document.getElementById('question-difficulty').value;
    var url = `https://opentdb.com/api.php?amount=${questionQuantity}`
    if(questionCategory !== 'any'){ url += `&category=${questionCategory}`}
    if(questionDifficulty !== 'any'){ url +=`&difficulty=${questionDifficulty}`}
    if(questionType !== 'any'){ url += `&type=${questionType}`}
    fetch(url)
        .then(response => response.json())
        .then(data => {if(data.results.length == 0){ alert('no hay preguntas suficientes')} else {printCards(data.results)}
    console.log(data.results)})
}




    function printCards(questions) {

        const container = document.getElementsByClassName('container')[0];//se pone el 0 porque trae el elemento en la primera posicion
        container.innerHTML = '';

        questions.forEach(question => {
            const card = returnCardHTML(question);
            container.innerHTML += card;
        
        })

    }

    function returnCardHTML(q) {
        const card = `<div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${q.category}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                            ${returnAnswersHTML(q.correct_answer, q.incorrect_answers)}
                        </div>
                    </div>
                        `
      return card;

    }



    function returnAnswersHTML (corrects, incorrects) {
        
        var answers = [];
        answers.push(...incorrects)
        answers.splice(Math.round(Math.random() * answers.length), 0, corrects);
        
        let answerstHTML = ''
        answers.forEach((answer) => {
            answerstHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                            <label class="form-check-label" for="exampleRadios1">
                            ${answer}
                            </label>
                        </div>`

        })
        return answerstHTML;

    }
