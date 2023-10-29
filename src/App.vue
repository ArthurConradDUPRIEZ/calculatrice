<template>
  <main>
      <div class="display">
          <div class="expression">{{ expression }}</div>
          <div class="result">{{ result }}</div>
      </div>
      <div class="pave">
          <input class="pavButton" type="button" value="%" @click="pourcent">
          <input class="pavButton" type="button" value="CE" @click="save">
          <input class="pavButton" type="button" value="C" @click="del">
          <input class="pavButton" type="button" value="<-" @click="remove">
          <input class="pavButton" type="button" value="1/x" @click="fraction">
          <input class="pavButton" type="button" value="x²" @click="puissance">
          <input class="pavButton" type="button" value="val" @click="recup">
          <input class="pavButton" type="button" value="/" @click="write('/')" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="7" @click="write(7)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="8" @click="write(8)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="9" @click="write(9)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="*" @click="write('*')" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="4" @click="write(4)" @keydown="handleKeydown">            
          <input class="pavButton" type="button" value="5" @click="write(5)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="6" @click="write(6)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="-" @click="write('-')" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="1" @click="write(1)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="2" @click="write(2)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="3" @click="write(3)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="+" @click="write('+')" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="+/-" @click="write(7)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="0" @click="write(0)" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="." @click="write('.')" @keydown="handleKeydown">
          <input class="pavButton" type="button" value="=" @click="calculation" @keydown="handleKeydown">
      </div>   
  </main>
  
</template>

<script setup>

import {ref} from 'vue';

const result = ref(0);
const savedExpression = ref('');
const expression = ref('');

// fonction permettant d'ecrire le la valeur ou l'opération désiré
function write(n) {
  expression.value = expression.value + n
}
function remove(){
  expression.value = expression.value.slice(0, -1);
}
function del(){
  expression.value = '';
}
function calculation(){
  result.value = eval(expression.value);
  savedExpression.value = expression.value;
}
function save(){
  expression.value = savedExpression.value;
}
function puissance(){
  result.value = eval(expression.value) * eval(expression.value);
  expression.value = ''
}
function pourcent(){
  result.value = eval(expression.value) / 100;
  expression.value = ''
}
function fraction(){
  result.value =  1 / eval(expression.value);
  expression.value = ''
}
function recup(){
  expression.value = result.value.toString();
}



function handleKeydown(event) {
  if (event.keyCode === 13) {
    // La touche "Entrée" du clavier principal
    console.log('La touche "Entrée" a été enfoncée !');
    calculation();
  } 
  else if (event.keyCode >= 96 && event.keyCode <= 105) {
    // Touches du pavé numérique de 0 à 9
    write(event.keyCode - 96);
  }
  else if (event.keyCode === 8){ //quand la touche back est appuyée
      remove();
  }
  else if(event.keyCode === 106){ //quand la touche * est appuyée
      write('*'); 
  }
  else if(event.keyCode === 107){ //quand la touche + est appuyée
      write('+');
  }
  else if(event.keyCode === 109){ //quand la touche - est appuyée
      write('-');
  }
  else if(event.keyCode === 110){  //quand la touche , est appuyée
      write('.')
  }
  else if(event.keyCode === 111){ //quand la touche / est appuyée
      write('/');
  }






}




</script>

<style>

main{
  position: absolute;
  left: 25%;
  top: 5%;
  width: 50%;
  height: 90vh;
  border: 1px solid black;
  border-radius: 10px;
  background-color: grey;
}

.display{
  width: 90%;
  height: 10%;
  padding: 5px;margin: 10px auto;
  background-color: white;
  border: 1px solid darkslategrey;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: right;
}
.display *{
  min-height: 40%;
}

.pave{
  border: 1px solid black;
  border-radius: 7px;
  width: 90%;
  height: 80%;
  margin: auto;
  background-color: rgb(63, 63, 63);
  display: grid;
  grid-template-columns: repeat(4,1fr);
  grid-template-rows: repeat(6,1fr);
  grid-gap: 3px;
}

.pavButton{
  font-size: 36px;
  margin: 5px;
  border-radius: 15px;
  cursor: pointer;
}

/* .pavButton:last-child{
  background-color: rgb(2, 86, 114);
} */

.pavButton:hover{
  font-weight: bold;
  border: 2px solid black;
  background-color: rgb(231, 133, 42);
}

.pavButton:active{
  background-color: rgb(231, 102, 42);
}


</style>
