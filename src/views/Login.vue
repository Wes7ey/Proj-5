<script>
export default {
  data: () => ({
    show1: true,
    show2: false,
    isFormValid: true,
    email: "",
    password: "",
    emailRules: [(v) => /.+@.+\..+/.test(v) || "E-mail inválido"],
    rulesPass: [(value) => !!value || "Senha inválida"],
  }),
  mounted() {
    this.isFirstFieldFocused = true;
  },
};
</script>

<template>
  <main class="d-flex flex-column justify-center align-center h-100">
    <v-container
      class="display d-flex flex-column justify-center align-center rounded-xl w-auto bg-white"
    >
      <v-form @submit.prevent v-model="isFormValid">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          class="input-field"
          ref="firstField"
          autofocus
        ></v-text-field>

        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="rulesPass"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          label="Senha"
          class="input-field"
          @click:append="show2 = !show2"
        ></v-text-field>
      </v-form>

      <v-btn :disabled="!isFormValid" elevation="8">Logar</v-btn>
    </v-container>
  </main>
</template>

<style scoped>
.input-field {
  background-color: #e7f1d5;
  width: 300px;
  height: 50px;
  margin: 50px;
  color: black;
}
</style>
