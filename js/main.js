


function getQuestions() {
    const questionQuantity = document.getElementById('questions-number').value;
    // const questionDifficulty = document.getElementById('questions-difficulty').value;

  
    fetch(`https://opentdb.com/api.php?amount=${questionQuantity}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
        console.log(questionQuantity);
}




    function printCards(questions) {

        const container = document.getElementsByClassName('container')[0];
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
        
        const correctHTML = `<div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                                <label class="form-check-label" for="exampleRadios1">
                                ${corrects}
                                </label>
                            </div>`
        
        
        let incorrectHTML = ''
        incorrects.forEach((incorrect) => {
            incorrectHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                            <label class="form-check-label" for="exampleRadios1">
                            ${incorrect}
                            </label>
                        </div>`

        })
        return correctHTML + incorrectHTML;

    }