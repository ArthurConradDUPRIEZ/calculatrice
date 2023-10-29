<template>

  <div class="about">
    <h1>This is an about page</h1>
    <h2>Je détaillé mon parcours ci-dessous :</h2>
  </div>
</template>

<style>

.about{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: red 1px solid;
}

.about h2{
  border: green 2px solid;
  width: 100%;
}



@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
