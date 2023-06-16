<template>
  <div class="d-flex justify-end ma-2">
    <router-link
      to="/"
      exact
      :class="{ 'disabled-button': $route.path === '/' }"
      class=" text-decoration-none button"
      >← Login
    </router-link>
    <p class="button" >|</p>
    <router-link
      to="/form"
      exact
      :class="{ 'disabled-button': $route.path === '/form' }"
      class=" text-decoration-none button"
      >Cadastro →</router-link
    >
  </div>
</template>

<script setup>
//
</script>

<style scoped>

.disabled-button {
  pointer-events: none;
  opacity: 0.5;
  margin: 2;
}

.button {
color: green;
padding: 3px;
}

</style>
