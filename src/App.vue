<template>
  <div :class="theme ? 'dark_mode' : 'light_mode'" >
    <header>
      <div id="switchTheme">
        <va-switch
          v-model="theme"
          size="large"
          color="#5123a1"
          off-color="#ffd300"
          style="--va-switch-checker-background-color: #252723;"
        >
          <template #innerLabel>
            <div class="va-text-center">
              <va-icon
                :name="theme ? 'dark_mode' : 'light_mode'"
              />
            </div>
          </template>
        </va-switch>
      </div>
    </header>
    <main>
      <div id="calculatrice">
        <div id="display">
            <div id="result">{{ result }}</div>
            <div id="expression">{{ expression }}</div> 
        </div>
        <div id="pave">
          <input v-for="(item, key) in listInput" v-bind:key="key" type="button" class="pavButton" :value="item.button" @click="item.function">
        </div> 
        <div id="memory">
          <h2>Historique</h2>
          <div id="containerMemory">
            <div v-for="(item,index) in resultMemory" :key="index">
              <p>{{ item.result }}</p>
              <p>{{ item.expression }}</p>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, watch } from 'vue';

const result = ref('');
const savedExpression = ref('');
const expression = ref('0');
const theme = ref(false);




const resultMemory = ref([]);


const readyToWrite = ref(true);
const tempExpression = ref('');

const listOperator = ['*','/','+','-']




function number(n: string){
  if (readyToWrite.value){
    if (n === '0'){
      expression.value = '0.';
    }else {
      expression.value = n;
    }
    
    readyToWrite.value = false;
  } else{
    expression.value = expression.value + n;
  }
}

function operator(n: string){
  if(result.value === '' && expression.value === '0'){
    result.value = '0' + n;
    console.log(result.value[0])
  }
  else if (result.value.length >= 1 && (listOperator.includes(result.value[result.value.length - 1])) && (readyToWrite.value)){
    result.value = result.value.slice(0, -1) + n;
  } else if (result.value === '' && expression.value !== '0'){
    result.value = expression.value + n;
    readyToWrite.value = true;
  } else if (result.value !== '' && expression.value !== '0' && readyToWrite.value === false && !result.value.includes('=')){
    result.value = eval(result.value + expression.value) + n;
    readyToWrite.value = true;
  } else if (result.value.length >= 1 && result.value[result.value.length - 1] === '=' ){
    result.value = expression.value + n;
  }
}

function dat(){
  if (readyToWrite.value){
    expression.value = '0.'
    readyToWrite.value = false;
  } else{
    expression.value = expression.value + '.'
  }
}


function memory() {
  resultMemory.value.push({
    result: result.value,
    expression: expression.value
  });
}

function remove(){                                                      // fonction permettant de supprimer le dernier terme inscrit
  expression.value = expression.value.slice(0, -1);
  if (expression.value.length === 0){
    expression.value = '0';
    readyToWrite.value = true;
  }
}

function del(){                                                         // fonction remettant à 0 l'expression 
  expression.value = '0';
  result.value = '';
  readyToWrite.value = true;
}
function calculation() {

    if (!result.value.includes('=')){

      result.value = result.value + expression.value + '=';
      // savedExpression.value = expression.value;
      expression.value = eval(result.value.slice(0,-1));
      readyToWrite.value = true
      memory();
    } else if (result.value.includes('=')) {
      console.log('il y a un egal')
      // result.value = 
    }

}

function save(){                                                        // fonction permettant de revenir à la dernière expression non calculée
  expression.value = savedExpression.value;
}
function puissance() {
  try {
    if (expression.value === '') {
      window.alert("L'expression est vide. Veuillez entrer une valeur avant d'effectuer cette opération.");
    } else {
      result.value = eval(expression.value) * eval(expression.value);
      expression.value = '';
    }
  } catch (error) {
    window.alert("Une erreur s'est produite lors du calcul de la puissance. Veuillez vérifier l'expression.");
  }
}


function pourcent() {
  try {
    if (expression.value === '') {
      window.alert("L'expression est vide. Veuillez entrer une valeur avant d'effectuer cette opération.");
    } else {
      result.value = eval(expression.value) / 100;
      expression.value = '';
    }
  } catch (error) {
    window.alert("Une erreur s'est produite lors du calcul du pourcentage. Veuillez vérifier l'expression.");
  }
}

function fraction() {
  try {
    if (expression.value === '') {
      window.alert("L'expression est vide. Veuillez entrer une valeur avant d'effectuer cette opération.");
    } else {
      result.value = 1 / eval(expression.value);
      expression.value = '';
    }
  } catch (error) {
    window.alert("Une erreur s'est produite lors du calcul de la fraction. Veuillez vérifier l'expression.");
  }
}





// function recup(){                                                       // fonction permettant de recupérer le résultat et de le réintroduire dans l'expression
//   expression.value = result.value.toString();
// }
// function signe() {
//   try {
//     if (expression.value === '') {
//       window.alert("L'expression est vide. Veuillez entrer une valeur pour la modifier.");
//     } else {
//       result.value = eval(expression.value) * -1;
//     }
//   } catch (error) {
//     window.alert("Une erreur s'est produite lors de la modification du signe. Veuillez vérifier l'expression.");
//   }
// }


const listInput = ref([
  {
    button: '%',
    function: 'pourcent'
  },
  {
    button: 'CE',
    function: 'save'
  },
  {
    button: 'C',
    function: () => del()
  },
  {
    button: '<-',
    function: () => remove()
  },
  {
    button: '1/x',
    function: 'fraction'
  },
  {
    button: 'x²',
    function: 'puissance'
  },
  {
    button: ' ²√x',
    function: 'recup'
  },
  {
    button: '/',
    function: () => operator('/')
  },
  {
    button: '7',
    function: () => number('7')
  },
  {
    button: '8',
    function: () => number('8')
  },
  {
    button: '9',
    function: () => number('9')
  },
  {
    button: '*',
    function: () => operator('*')
  },
  {
    button: '4',
    function: () => number('4')
  },
  {
    button: '5',
    function: () => number('5')
  },
  {
    button: '6',
    function: () => number('6')
  },
  {
    button: '-',
    function: () => operator('-')
  },
  {
    button: '1',
    function: () => number('1')
  },
  {
    button: '2',
    function: () => number('2')
  },
  {
    button: '3',
    function: () => number('3')
  },
  {
    button: '+',
    function: () => operator('+')
  },
  {
    button: '+/-',
    function: 'signe'
  },
  {
    button: '0',
    function: () => number('0')
  },
  {
    button: '.',
    function: () => dat()
  },
  {
    button: '=',
    function: () => calculation()
  },
  
  
]);


function showClick(key : any){                                                  // fonction permettant d'afficher la touche qui a été enfoncer sur le clavier
  const buttonSelected = document.querySelector(`input[value="${key}"]`); // on recupere le bouton correspondant à la touche de clavier appuyée
  if (buttonSelected) {
    buttonSelected.classList.add('clicked');                                // on ajoute la class clicked qui possède certains style
    buttonSelected.click();                                                 // on click sur la touche désirée
    setTimeout(() =>{                                                       // et on enlève la class clicked 0.2 sec après 
      buttonSelected.classList.remove('clicked');                           
    }, 200)
  }
  
}


function handleKeydown(event:any) {
  const key = event.key;
  const operators = ['0','1','2','3','4','5','6','7','8','9','*','-','+','/','.','%']
  if (key === 'Enter') {
    showClick('=');
  } 
  else if (operators.includes(key)) {
    // const buttonSelected = document.querySelector(`input[value="${key}"]`);
    showClick(key);
  } 
  else if (key === 'Backspace') {
    showClick('<-')
  }
  else if (key === 'ArrowUp') {
    showClick('val')
  }
  else if (key === 'Delete') {
    showClick('CE')
  }
  else if (key === 'Escape') {
    showClick('C')
  }
  else if (key === '²') {
    showClick('x²')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);

});


</script>

<style>

header{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
}

.light_mode{
  padding: 10px;
  background-color: rgb(221, 220, 220);
  height: 100vh;
}
#switchTheme{
  margin: 0 10px ;
  height: 100%;
}

#calculatrice{
  position: absolute;
  left: 25%;
  top: 5%;
  width: 50%;
  /* min-height: 400px; */
  height: 90vh;
  border: 3px solid black;
  border-radius: 10px;
  background-color: rgb(97, 114, 242);
}
#calculatrice #expression{
  font-size: 24px;
}

#display{
  width: 90%;
  height: 10%;
  min-height: 50px;
  padding: 5px;margin: 10px auto;
  background-color: white;
  border: 2px solid black   ;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: right;
}
#display *{
  min-height: 40%;
  color: black;
  font-weight: bold;
}

#pave{
  border: 2px solid black;
  border-radius: 7px;
  width: 90%;
  height: 80%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(6,1fr);
  grid-gap: 3px;
  background-color: rgb(141, 153, 242);
}

#pave .pavButton{
  font-size: 36px;
  margin: 5px;
  border-radius: 15px;
  border: 1px solid black;
  cursor: pointer;
  background-color: rgb(196, 202, 245);
}


#pave .pavButton:hover{
  font-weight: bold;
  border: 2px solid black;
  background-color: rgb(231, 133, 42);
}

#pave .pavButton:active, .pavButton.clicked{
  background-color: rgb(231, 102, 42);
}

#memory{
  /* display: flex; */
  position: absolute;
  top: 10px;
  right: -252px;
  background-color: #9d94ff;
  width: 250px;
  height: calc(100% - 20px);
  border: 1px solid black;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  
}

#memory h2{
  font-size: 24px;
  padding: 10px;
}

#memory #containerMemory{
  height: 90%;
  width: 90%;
  min-width: 150px;
  background-color: #c4caf5;
  margin: auto;
  overflow-y: auto;
  border: 1px solid black;
  border-radius:5px;
  overflow: auto;
  
}

#memory #containerMemory div{
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  
}
#containerMemory div p{
  width: 100%;
  padding: 0px 5px 0px 0px;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  /* justify-content: right; */
  text-align: right;
}



.dark_mode{
  background-color: #171010;
  padding: 10px;
  height: 100vh;
}
.dark_mode #calculatrice{
  background-color: #362222;
}
.dark_mode #display *{
  color: #B5B5B5;
}
 
.dark_mode #pave, .dark_mode #display{
  background-color: #423F3E;
}
.dark_mode #pave .pavButton{
  background-color: #2B2B2B;
  color: #bbbbbb;
  border-color: #cccccc;
}

/* Largeur de la scrollbar */
::-webkit-scrollbar {
    width: 12px;
}

/* Couleur de fond de la scrollbar */
::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    
}

/* Couleur de la poignée de la scrollbar */
::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
}

/* Changement de couleur lorsque la souris survole la poignée */
::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}





@media (max-width:700px){
#calculatrice{
  height: 60%
}
#pave .pavButton{
  font-size: 20px;
}
};

@media (max-width:550px){
.dark_mode, .light_mode{
  position: absolute;
  width: 100%;
  height: 100%;
}  
#calculatrice{
  position: relative;
  top: 25px;
  left: 5px;
  height: 100%;
  /* min-height: 500px; */
  width: 100%;
  padding: 15px;
}
#pave{
  height: 80%;
  margin: auto  ;
}
#pave .pavButton{
  font-size: 20px;
  height: 60px;
}

};


</style>
