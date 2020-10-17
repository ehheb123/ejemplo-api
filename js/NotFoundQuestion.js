export default class NotFoundQuestion {
  
    constructor (container){
      this.container = container
    }
  
    printMessageNotFoundQuestion(){
        this.container.innerHTML = `<div class="card space-top margin-questions">
                                      <div class="card-body">
                                          "No se encontraron preguntas con las características mencionadas"
                                      </div>
                                    </div>`  
    }
  
  }


// export default class NotFoundQuestion {
    
//     constructor(container){
//     this.container = container;

//     }

//     printMessageNotFoundQuestion(){
//         this.container.innerHTML = `<div class="card">
//                                         <div class="card-body">
//                                             "No se encontraron preguntas con las características mencionadas"
//                                         </div>
//                                     </div>`  
//     }
// }