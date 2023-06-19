<script>
export default {
  data: () => ({
    isFormValid: true,
    email: "",
    password: "",
    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido"],
    rulesPass: [
      (value) => (!!value) || "Senha inválida",
  ],
  }),
  }
</script>

<template>
  <main class="d-flex flex-column justify-center align-center h-100 ">

      <v-container class="display d-flex flex-column justify-center align-center rounded-xl w-auto bg-white">

  <v-form @submit.prevent v-model="isFormValid">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        class="input-field"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Senha"
        :rules="rulesPass"
        required
        class="input-field "
      ></v-text-field>
  </v-form>

  <v-btn  :disabled="!isFormValid" elevation="8"> Logar </v-btn>
</v-container>

</main>

</template>

<style scoped>

.input-field{
  background-color: #E7F1D5;
  width: 300px;
  height: 50px;
  margin: 50px;
  color: black;
 }
</style>