<template>
  <div class="d-flex">
    <router-link to="/login" exact :class="{ 'disabled-button': $route.path === '/login' }">Login</router-link>
   <p>   |  </p>  
      <router-link to="/form" exact :class="{ 'disabled-button': $route.path === '/form' }">Cadastro</router-link>
  </div>
      

</template>

<script setup>
  //
</script>

<style scoped>

.disabled-button {
  pointer-events: none;
  opacity: 0.5;
}

</style>
