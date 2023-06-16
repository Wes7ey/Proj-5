<script>
export default {
  data: () => ({
    isFormValid: true,
    email: "",
    password: "",
    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido"],
    rulesPass: [
      (value) => (value.lenght >= 0) || "Digite uma senha",
    ],
  }),
  }
</script>

<template>
  <main class="d-flex flex-row justify-center justify-space-around align-center">

      <v-container class="display d-flex flex-column justify-center align-center rounded-xl">

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


.display{
    background-color: rgb(247, 242, 242);
    border: 1px solid black;
    min-height: 300px;
    width: 400px;
    margin-top: 250px;
}

.input-field{
  background-color: #E7F1D5;
  width: 300px;
  height: 50px;
  margin: 50px;
  color: black;
 }
</style>