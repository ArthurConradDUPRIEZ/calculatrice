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
      <div id="calculatruice">
        <div class="display">
            <div class="expression">{{ expression }}</div>
            <div class="result">{{ result }}</div>
        </div>
        <div class="pave">
          <input v-for="item in listInput" type="button" class="pavButton" :value="item.button" @click="item.function">
        </div> 
      </div>
    </main>
  </div>
</template>

<script setup>

import { ref, onMounted, watch } from 'vue';

const result = ref(0);
const savedExpression = ref('');
const expression = ref('');
const theme = ref(false);

function write(n) {                                                     // fonction permettant d'ecrire le la valeur ou l'opération désiré
  expression.value = expression.value + n
}
function remove(){                                                      // fonction permettant de supprimer le dernier terme inscrit
  expression.value = expression.value.slice(0, -1);
}
function del(){                                                         // fonction remettant à 0 l'expression 
  expression.value = '';
}
function calculation(){                                                 // fonction qui calcule l'espression et l'affiche dans le resultat
  result.value = eval(expression.value);
  savedExpression.value = expression.value;
}
function save(){                                                        // fonction permettant de revenir à la dernière expression non calculée
  expression.value = savedExpression.value;
}
function puissance(){                                                   // fonction permettant de calculer le carré de l'expression
  result.value = eval(expression.value) * eval(expression.value);
  expression.value = ''
}
function pourcent(){                                                    // fonction permettant d'afficher l'expression en pourcentage
  result.value = eval(expression.value) / 100;
  expression.value = ''
}
function fraction(){                                                    // fonction permettant de calculer l'inverse de l'expression
  result.value =  1 / eval(expression.value);
  expression.value = ''
}
function recup(){                                                       // fonction permettant de recupérer le résultat et de le réintroduire dans l'expression
  expression.value = result.value.toString();
}
function signe(){                                                       // fonction permettant de modifier le signe de l'expression
  result.value = eval(expression.value) * -1
}

const listInput = ref([
  {
    button: '%',
    function: pourcent
  },
  {
    button: 'CE',
    function: save
  },
  {
    button: 'C',
    function: del
  },
  {
    button: '<-',
    function: remove
  },
  {
    button: '1/x',
    function: fraction
  },
  {
    button: 'x²',
    function: puissance
  },
  {
    button: 'val',
    function: recup
  },
  {
    button: '/',
    function: () => write('/')
  },
  {
    button: '7',
    function: () => write(7)
  },
  {
    button: '8',
    function: () => write(8)
  },
  {
    button: '9',
    function: () => write(9)
  },
  {
    button: '*',
    function: () => write('*')
  },
  {
    button: '4',
    function: () => write(4)
  },
  {
    button: '5',
    function: () => write(5)
  },
  {
    button: '6',
    function: () => write(6)
  },
  {
    button: '-',
    function: () => write('-')
  },
  {
    button: '1',
    function: () => write(1)
  },
  {
    button: '2',
    function: () => write(2)
  },
  {
    button: '3',
    function: () => write(3)
  },
  {
    button: '+',
    function: () => write('+')
  },
  {
    button: '+/-',
    function: signe
  },
  {
    button: '0',
    function: () => write(0)
  },
  {
    button: '.',
    function: () => write('.')
  },
  {
    button: '=',
    function: calculation
  },
  
  
]);


function showClick(key){                                                  // fonction permettant d'afficher la touche qui a été enfoncer sur le clavier
  const buttonSelected = document.querySelector(`input[value="${key}"]`); // on recupere le bouton correspondant à la touche de clavier appuyée
  buttonSelected.classList.add('clicked');                                // on ajoute la class clicked qui possède certains style
  buttonSelected.click();                                                 // on click sur la touche désirée
  setTimeout(() =>{                                                       // et on enlève la class clicked 0.2 sec après 
    buttonSelected.classList.remove('clicked');                           
  }, 200)
}


function handleKeydown(event) {
  const key = event.key;

  if (key === 'Enter') {
    showClick('=');
  } 
  else if (key >= '0' && key <= '9') {
    // const buttonSelected = document.querySelector(`input[value="${key}"]`);
    showClick(key);
  } 
  else if (key === 'Backspace') {
    showClick('<-')
  } 
  else if (key === '*') {
    showClick(key);
  } 
  else if (key === '+') {
    showClick(key);
  } 
  else if (key === '-') {
    showClick(key);
  } 
  else if (key === '.') {
    showClick(key);
  } 
  else if (key === '/') {
    showClick(key);
  }
  else if (key === 'ArrowUp') {
    showClick('val')
  }
  else if (key === 'Delete') {
    showClick('C')
  }
  else if (key === 'Escape') {
    showClick('CE')
  }
  else if (key === '²') {
    showClick('x²')
  }
  else if (key === '%') {
    showClick(key)
  }
}

function changeTheme(newTheme){
  console.log('Le thème a changé : ', newTheme);
};

watch(theme, changeTheme)

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

#calculatruice{
  position: absolute;
  left: 25%;
  top: 5%;
  width: 50%;
  min-height: 400px;
  height: 90vh;
  border: 3px solid black;
  border-radius: 10px;
  background-color: rgb(97, 114, 242);
}

.display{
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
.display *{
  min-height: 40%;
  color: black;
  font-weight: bold;
}

.pave{
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

.pave .pavButton{
  font-size: 36px;
  margin: 5px;
  border-radius: 15px;
  border: 1px solid black;
  cursor: pointer;
  background-color: rgb(196, 202, 245);
}


.pavButton:hover{
  font-weight: bold;
  border: 2px solid black;
  background-color: rgb(231, 133, 42);
}

.pavButton:active, .pavButton.clicked{
  background-color: rgb(231, 102, 42);
}

.dark_mode{
  background-color: #171010;
  padding: 10px;
  height: 100vh;
}
.dark_mode #calculatruice{
  background-color: #362222;
}
.dark_mode .display *{
  color: #B5B5B5;
}
 
.dark_mode .pave, .dark_mode .display{
  background-color: #423F3E;
}
.dark_mode .pavButton{
  background-color: #2B2B2B;
  color: #bbbbbb;
  border-color: #cccccc;
}







@media (max-width:700px){
main{
  height: 60%
}
.pavButton{
  font-size: 20px;
}
};

@media (max-width:550px){
main{
  height: 50%
}
.pavButton{
  font-size: 14px;
}

};

@media screen {
  
}

</style>
