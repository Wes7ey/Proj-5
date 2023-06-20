<template>
  <div class="d-flex justify-center ma-2">
    <router-link
      to="/"
      exact
      :class="{ 'disabled-button': $route.path === '/' }"
      class="text-decoration-none navbar"
      >Login
    </router-link>
    <p class="navbar">|</p>
    <router-link
      to="/form"
      exact
      :class="{ 'disabled-button': $route.path === '/form' }"
      class="text-decoration-none navbar"
      >Cadastro</router-link
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

.navbar {
  color: green;
  padding: 3px;
  font-size: x-large;
}
</style>
